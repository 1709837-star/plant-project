package com.example.plantapi.controller;

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

    @PostMapping
    public MyPlantResponse create(@Valid @RequestBody MyPlantCreateRequest request,
                                  Authentication auth) {
        return myPlantService.create(request, auth);
    }

    // GET /api/my-plants?sort=due
    @GetMapping
    public List<MyPlantResponse> list(@RequestParam(required = false) String sort,
                                      Authentication auth) {
        return myPlantService.list(sort, auth);
    }

    @GetMapping("/{id}")
    public MyPlantResponse get(@PathVariable Long id, Authentication auth) {
        return myPlantService.get(id, auth);
    }

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
