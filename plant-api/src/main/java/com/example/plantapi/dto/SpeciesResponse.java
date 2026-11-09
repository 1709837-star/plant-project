package com.example.plantapi.dto;

import com.example.plantapi.domain.Species;
import java.time.LocalDate;

public record SpeciesResponse(
        Long id,
        String name,
        String scientificName,
        String lightLevel,
        String difficulty,
        Integer minWinterTemp,
        Integer waterSpringDays,
        Integer waterSummerDays,
        Integer waterAutumnDays,
        Integer waterWinterDays,
        Integer wateringIntervalDays, // 오늘 계절에 맞는 간격
        String waterNote,
        String sourceUrl,
        String imageUrl
) {
    public static SpeciesResponse from(Species s) {
        return new SpeciesResponse(
                s.getId(),
                s.getName(),
                s.getScientificName(),
                s.getLightLevel(),
                s.getDifficulty(),
                s.getMinWinterTemp(),
                s.getWaterSpringDays(),
                s.getWaterSummerDays(),
                s.getWaterAutumnDays(),
                s.getWaterWinterDays(),
                s.getWateringIntervalDays(LocalDate.now().getMonthValue()),
                s.getWaterNote(),
                s.getSourceUrl(),
                s.getImageUrl()
        );
    }
}
