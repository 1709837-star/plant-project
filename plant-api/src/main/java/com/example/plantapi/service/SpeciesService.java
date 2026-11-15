package com.example.plantapi.service;
/* 일하는 곳 */
import com.example.plantapi.domain.Species;
import com.example.plantapi.dto.SpeciesResponse;
import com.example.plantapi.repository.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // 읽기만 하는 거라, DB를 안 바꿔서 조회가 빨라짐
public class SpeciesService {

    private final SpeciesRepository speciesRepository;

    /* 목록 가져오기 */
    // (4) getSpecies() 괄호 안에 컨트롤러가 주는 값이 순서대로 들어옴
    public Page<SpeciesResponse> getSpecies(String keyword, String light, String difficulty, Pageable pageable) {
        return speciesRepository.search(
                        blankToNull(keyword),
                        blankToNull(light),
                        blankToNull(difficulty),
                        pageable
                )
                .map(SpeciesResponse::from);
        // (5) blankToNull()을 거쳐서, Repository에 넘김

        // (7) .map으로 Page<SpeciesResponse DTO>로 바꿔서 컨트롤러에 넘김
    }

    /* 상세 가져오기 */
    public SpeciesResponse getSpecies(Long id) {
        Species species = speciesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 식물이 없습니다. id=" + id));
        return SpeciesResponse.from(species);
    }

    // 빈 문자열("")이 오면 null로 바꿔. 그래야 @Query에서 조건을 무시해
    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}
