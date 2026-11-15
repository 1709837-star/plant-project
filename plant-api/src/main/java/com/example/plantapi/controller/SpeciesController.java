package com.example.plantapi.controller;
/* 도감 조회 api - 읽기 전용이라 POST/PUT/DELETE 없음 */
import com.example.plantapi.dto.SpeciesResponse;
import com.example.plantapi.service.SpeciesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/species")
public class SpeciesController {

    private final SpeciesService speciesService; // "일은 서비스에게 넘겨"

    /* 목록 조회 */
    // (1) GET /api/species?keyword=몬스테라&light=MEDIUM&difficulty=초보자&page=0&size=10를 컨트롤러가 받아서
    // (2) @RequestParam이 주소 뒤에 붙은 '?keyword=몬스테라' 를 뜯어서 keyword 변수에 넣어줌
    @GetMapping
    public Page<SpeciesResponse> getSpecies(
            @RequestParam(required = false) String keyword, // 검색어를 안 치면 null로 돌아옴
            @RequestParam(required = false) String light,
            @RequestParam(required = false) String difficulty,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable
            // page랑 size를 안 주면 기본값으로 10개씩, 이름순으로 가져옴
    ) {
        return speciesService.getSpecies(keyword, light, difficulty, pageable);
        // (3) 변수에 넣어진 keyword, light, ...을 서비스에 넘김

        // (8) 받아서 그대로 프론트에 JSON으로 넘겨줌
    }

    /* 상세 조회 */
    // GET /api/species/1
    @GetMapping("/{id}")
    public SpeciesResponse getSpecies(@PathVariable Long id) {
        return speciesService.getSpecies(id); // 서비스에게 넘김
    }
}
