package com.example.plantapi.controller;
/* 내 식물 : 접수처 */
import com.example.plantapi.domain.MyPlant;
import com.example.plantapi.dto.*;
import com.example.plantapi.service.MyPlantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-plants")
public class MyPlantController {

    private final MyPlantService myPlantService;

    // 모든 메소드에 Authentication auth가 있음. 스프링이 로그인한 사람 정보를 넣어줌

    /* 등록하기 */
    // POST /api/my-plants
    @PostMapping
    public MyPlantResponse create(@Valid @RequestBody MyPlantCreateRequest request,
                                  Authentication auth) {
        return myPlantService.create(request, auth);
    }

    /* 목록 가져오기 */
    // GET /api/my-plants
    @GetMapping
    public List<MyPlantResponse> list(@RequestParam(required = false) String sort,
                                      Authentication auth) {
        // sort 없어도 됨. 있으면 D-day순으로 정렬
        return myPlantService.list(sort, auth);
    }

    /* 상세 가져오기 */
    // GET /api/my-plants/3
    @GetMapping("/{id}")
    public MyPlantResponse get(@PathVariable Long id, Authentication auth) {
        return myPlantService.get(id, auth); // 변수에 담긴 애들을 서비스에 넘김
    }

    /* 내 식물 수정하기 */
    @PutMapping("/{id}")
    public MyPlantResponse update(@PathVariable Long id,
                                  @Valid @RequestBody MyPlantUpdateRequest request,
                                  Authentication auth) {
        return myPlantService.update(id, request, auth);
    }

    @DeleteMapping("/{id}")
    public Map<String, Long> delete(@PathVariable Long id, Authentication auth) {
        myPlantService.delete(id, auth);
        return Map.of("id", id);
    }

    @PostMapping("/{id}/photo")
    public ResponseEntity<Map<String, Object>> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {
        MyPlant plant = myPlantService.uploadPhoto(id, file, authentication.getName());
        return ResponseEntity.ok(Map.of("id", plant.getId(), "photoUrl", plant.getPhotoUrl()));
    }

    // 물주기 버튼
    @PostMapping("/{id}/waterings")
    public WateringLogResponse water(@PathVariable Long id,
                                     @RequestBody WateringRequest request,
                                     Authentication auth) {
        return myPlantService.water(id, request, auth);
    }

    @GetMapping("/{id}/waterings")
    public List<WateringLogResponse> listWaterings(@PathVariable Long id, Authentication auth) {
        return myPlantService.listWaterings(id, auth);
    }

    // 물주기 기록 삭제는 블로그 댓글 삭제처럼 평평한 경로야
    @DeleteMapping("/waterings/{wateringId}")
    public Map<String, Long> deleteWatering(@PathVariable Long wateringId, Authentication auth) {
        myPlantService.deleteWatering(wateringId, auth);
        return Map.of("id", wateringId);
    }
}
