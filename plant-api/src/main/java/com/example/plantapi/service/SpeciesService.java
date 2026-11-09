package com.example.plantapi.service;

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
@Transactional(readOnly = true)
public class SpeciesService {

    private final SpeciesRepository speciesRepository;

    public Page<SpeciesResponse> getSpecies(String keyword, String light, String difficulty, Pageable pageable) {
        return speciesRepository.search(
                        blankToNull(keyword),
                        blankToNull(light),
                        blankToNull(difficulty),
                        pageable
                )
                .map(SpeciesResponse::from);
    }

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
