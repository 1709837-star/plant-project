package com.example.plantapi.service;

import com.example.plantapi.domain.MyPlant;
import com.example.plantapi.domain.Species;
import com.example.plantapi.domain.User;
import com.example.plantapi.domain.WateringLog;
import com.example.plantapi.dto.*;
import com.example.plantapi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPlantService {

    private final MyPlantRepository myPlantRepository;
    private final SpeciesRepository speciesRepository;
    private final UserRepository userRepository;
    private final WateringLogRepository wateringLogRepository;

    // 로그인한 사람 찾기. Authentication.getName()이 이메일이야
    private User currentUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("로그인한 사용자를 찾을 수 없습니다"));
    }

    // 내 식물 맞는지 확인. 남의 식물은 못 건드려
    private MyPlant myPlantOrThrow(Long id, User user) {
        MyPlant plant = myPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 식물이 없습니다. id=" + id));
        if (!plant.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("본인의 식물만 조회·수정·삭제할 수 있습니다");
        }
        return plant;
    }

    public MyPlantResponse create(MyPlantCreateRequest request, Authentication auth) {
        User user = currentUser(auth);

        Species species = null;
        if (request.speciesId() != null) {
            species = speciesRepository.findById(request.speciesId())
                    .orElseThrow(() -> new NoSuchElementException("해당 도감 식물이 없습니다"));
        }

        MyPlant plant = MyPlant.builder()
                .user(user)
                .species(species)
                .nickname(request.nickname())
                .location(request.location())
                .wateringIntervalDays(request.wateringIntervalDays())
                .lastWateredDate(request.lastWateredDate())
                .adoptedDate(request.adoptedDate())
                .memo(request.memo())
                .build();

        return MyPlantResponse.from(myPlantRepository.save(plant));
    }

    @Transactional(readOnly = true)
    public List<MyPlantResponse> list(String sort, Authentication auth) {
        User user = currentUser(auth);
        List<MyPlantResponse> result = myPlantRepository.findByUserId(user.getId()).stream()
                .map(MyPlantResponse::from)
                .toList();

        // sort=due면 D-day 임박순. dDay가 null이면 맨 뒤로
        if ("due".equals(sort)) {
            result = result.stream()
                    .sorted(Comparator.comparing(
                            MyPlantResponse::dDay,
                            Comparator.nullsLast(Comparator.naturalOrder())))
                    .toList();
        }
        return result;
    }

    @Transactional(readOnly = true)
    public MyPlantResponse get(Long id, Authentication auth) {
        return MyPlantResponse.from(myPlantOrThrow(id, currentUser(auth)));
    }

    public MyPlantResponse update(Long id, MyPlantUpdateRequest request, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));
        // 네 change() 시그니처가 다르면 이 줄만 맞게 고쳐
        plant.change(request.nickname(), request.location(), request.wateringIntervalDays(),
                request.lastWateredDate(), request.adoptedDate(), request.memo());
        return MyPlantResponse.from(plant);
    }

    public void delete(Long id, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));
        myPlantRepository.delete(plant); // WateringLog는 cascade로 같이 지워져
    }

    // 물주기 버튼 — 기록 만들고, 마지막 물 준 날도 오늘로 바꿔
    public WateringLogResponse water(Long id, WateringRequest request, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));
        LocalDate date = request.wateredDate() != null ? request.wateredDate() : LocalDate.now();

        WateringLog log = WateringLog.builder()
                .myPlant(plant)
                .wateredDate(date)
                .memo(request.memo())
                .build();
        wateringLogRepository.save(log);

        plant.markWatered(date);
        return WateringLogResponse.from(log);
    }

    @Transactional(readOnly = true)
    public List<WateringLogResponse> listWaterings(Long id, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));
        return wateringLogRepository.findByMyPlantIdOrderByWateredDateDesc(plant.getId()).stream()
                .map(WateringLogResponse::from)
                .toList();
    }

    public void deleteWatering(Long wateringId, Authentication auth) {
        WateringLog log = wateringLogRepository.findById(wateringId)
                .orElseThrow(() -> new NoSuchElementException("해당 물주기 기록이 없습니다"));
        myPlantOrThrow(log.getMyPlant().getId(), currentUser(auth)); // 남의 기록인지 확인만 해
        wateringLogRepository.delete(log);
    }

    // 사진 업로드
    @Transactional
    public MyPlant uploadPhoto(Long id, MultipartFile file, String email) throws IOException {
        MyPlant plant = myPlantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("식물을 찾을 수 없습니다"));
        if (!plant.getUser().getEmail().equals(email)) {
            throw new AccessDeniedException("본인 식물만 사진을 올릴 수 있습니다");
        }
        String uploadDir = "uploads/my-plants";
        Files.createDirectories(Path.of(uploadDir));
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = id + "_" + System.currentTimeMillis() + "." + ext;
        Path path = Path.of(uploadDir, filename);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        plant.updatePhoto("/uploads/my-plants/" + filename);
        return plant;
    }

}
