package com.example.plantapi.service;
/* 내 식물 : 실질적으로 일하는 곳 */
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
@Transactional // 메소드 하나가 실패하면, 그 안에서 한 DB작업 전부 되돌림
public class MyPlantService {

    private final MyPlantRepository myPlantRepository;
    private final SpeciesRepository speciesRepository;
    private final UserRepository userRepository;
    private final WateringLogRepository wateringLogRepository;

    // MyPlantResponse.from() : 엔터티(MyPlant)를 그대로 프론트에 보내면 안되니까, 응답용으로 바꾸는 공장
    // 서비스에서 return은 컨트롤러에게 돌려주는 것. 자바 메소드 호출한 쪽으로 값을 넘기는 것
    // - MyPlantResponse.from(plant)로 받은 걸 컨트롤러에게 돌려줌

    /* 공통 도우미 (1) */
    // 로그인한 사람 찾기
    private User currentUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("로그인한 사용자를 찾을 수 없습니다"));
    }

    /* 공통 도우미 (2) */
    // 내 식물 맞는지 확인. 남의 식물은 못 건드려
    private MyPlant myPlantOrThrow(Long id, User user) {
        MyPlant plant = myPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 식물이 없습니다. id=" + id));
        if (!plant.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("본인의 식물만 조회·수정·삭제할 수 있습니다");
        }
        return plant;
    }

    /* 내 식물 등록하기 */
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

        return MyPlantResponse.from(myPlantRepository.save(plant)); // 응답용으로 바꿔서 돌려줌
    }

    /* 내 식물 목록 가져오기 */
    @Transactional(readOnly = true) // 읽기만 하는 거라서, "바꾸지 않을게" 라는 표시 - 성능 좋아짐
    public List<MyPlantResponse> list(String sort, Authentication auth) {
        User user = currentUser(auth);
        List<MyPlantResponse> result = myPlantRepository
                .findByUserId(user.getId())
                .stream()
                .map(MyPlantResponse::from)
                .toList();

        // sort=due면 D-day 임박순. dDay가 null이면 맨 뒤로
        if ("due".equals(sort)) {
            result = result.stream()
                    .sorted(Comparator.comparing(
                            MyPlantResponse::dDay,
                            Comparator.nullsLast(Comparator.naturalOrder())))
                    .toList();
        } else if ("latest".equals(sort)) {
            // 최신 등록순: id가 클수록 최근에 등록한 것
            result = result.stream()
                    .sorted(Comparator.comparing(
                            MyPlantResponse::id).reversed())
                    .toList();
        } else if ("oldest".equals(sort)) {
            // 과거 등록순: id가 작을수록 먼저 등록한 것
            result = result.stream()
                    .sorted(Comparator.comparing(
                            MyPlantResponse::id))
                    .toList();
        }
        return result;
    }

    /* 내 식물 목록 상세 가져오기 */
    @Transactional(readOnly = true)
    public MyPlantResponse get(Long id, Authentication auth) {
        return MyPlantResponse.from(myPlantOrThrow(id, currentUser(auth)));
    }

    /* 내 식물 수정하기 */
    public MyPlantResponse update(Long id, MyPlantUpdateRequest request, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));

        plant.change(request.nickname(), request.location(), request.wateringIntervalDays(),
                request.lastWateredDate(), request.adoptedDate(), request.memo());
        // plant.change()로 값을 바꾸면, @Transactional이 끝나면서 스프링이 "아, 값이 바뀌었네" 하고 자동으로 DB에 저장
        return MyPlantResponse.from(plant);
    }

    /* 내 식물 삭제하기 */
    public void delete(Long id, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));

        myPlantRepository.delete(plant); // WateringLog는 cascade로 같이 지워져
    }

    /* 물주기 */
    // 기록 만들고, 마지막 물 준 날도 오늘로 바꿔
    public WateringLogResponse water(Long id, WateringRequest request, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));

        LocalDate date = request.wateredDate() != null ? request.wateredDate() : LocalDate.now();
        // 날짜 안 오면 오늘 날짜 넣기

        WateringLog log = WateringLog.builder()
                .myPlant(plant)
                .wateredDate(date)
                .memo(request.memo())
                .build();
        wateringLogRepository.save(log);

        plant.markWatered(date); // 마지막 물 준 날 바꿈
        return WateringLogResponse.from(log);
    }

    /* 물주기 기록 목록 */
    @Transactional(readOnly = true)
    public List<WateringLogResponse> listWaterings(Long id, Authentication auth) {
        MyPlant plant = myPlantOrThrow(id, currentUser(auth));

        return wateringLogRepository.findByMyPlantIdOrderByWateredDateDesc(plant.getId())
                .stream()
                .map(WateringLogResponse::from)
                .toList();
    }

    /* 물주기 기록 삭제 */
    public void deleteWatering(Long wateringId, Authentication auth) {
        WateringLog log = wateringLogRepository.findById(wateringId)
                .orElseThrow(() -> new NoSuchElementException("해당 물주기 기록이 없습니다"));
        myPlantOrThrow(log.getMyPlant().getId(), currentUser(auth)); // 남의 기록인지 확인만 해

        wateringLogRepository.delete(log);
    }

    /* 사진 업로드 */
    @Transactional
    public MyPlant uploadPhoto(Long id, MultipartFile file, String email) throws IOException {
        MyPlant plant = myPlantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("식물을 찾을 수 없습니다"));
        if (!plant.getUser().getEmail().equals(email)) {
            throw new AccessDeniedException("본인 식물만 사진을 올릴 수 있습니다");
        }  // 여기는 myPlantOrThrow를 안 쓰고 직접 확인 - 이메일 문자열로 받으니까

        String uploadDir = "uploads/my-plants";
        Files.createDirectories(Path.of(uploadDir)); // 이 루트의 폴더를 만들고, 있으면 그냥 넘어가.

        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = id + "_" + System.currentTimeMillis() + "." + ext; // ext: 확장자

        Path path = Path.of(uploadDir, filename);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING); // 실제 파일이 서버에 저장

        plant.updatePhoto("/uploads/my-plants/" + filename); // DB에는 파일 자체를 안 넣고, 경로만 저장 ★
        return plant; // {"id": 3, "photoUrl": "/uploads/my-plants/3_...jpg"}를 프론트에 돌려줌
    }

}
