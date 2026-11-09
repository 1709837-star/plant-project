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

    private final SpeciesService speciesService;

    // GET /api/species?keyword=몬스테라&light=MEDIUM&difficulty=초보자&page=0&size=10
    @GetMapping
    public Page<SpeciesResponse> getSpecies(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String light,
            @RequestParam(required = false) String difficulty,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return speciesService.getSpecies(keyword, light, difficulty, pageable);
    }

    // GET /api/species/1
    @GetMapping("/{id}")
    public SpeciesResponse getSpecies(@PathVariable Long id) {
        return speciesService.getSpecies(id);
    }
}
