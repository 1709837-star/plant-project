package com.example.plantapi.dto;

import com.example.plantapi.domain.Species;
import java.time.LocalDate;

public record SpeciesResponse(
        Long id,
        String name,
        String category,
        String growthForm,
        String growthHeight,
        String growthWidth,
        String placement,
        String optimalTemp,
        String humidity,
        String lightLevel,
        String difficulty,
        Integer minWinterTemp,
        String waterNote,
        String waterSpringImg,
        String waterSummerImg,
        String waterAutumnImg,
        String waterWinterImg,
        String waterSpringNote,
        String waterSummerNote,
        String waterAutumnNote,
        String waterWinterNote,
        String sourceUrl,
        String imageUrl
) {
    public static SpeciesResponse from(Species s) {
        return new SpeciesResponse(
                s.getId(),
                s.getName(),
                s.getCategory(),
                s.getGrowthForm(),
                s.getGrowthHeight(),
                s.getGrowthWidth(),
                s.getPlacement(),
                s.getOptimalTemp(),
                s.getHumidity(),
                s.getLightLevel(),
                s.getDifficulty(),
                s.getMinWinterTemp(),
                s.getWaterNote(),
                s.getWaterSpringImg(),
                s.getWaterSummerImg(),
                s.getWaterAutumnImg(),
                s.getWaterWinterImg(),
                s.getWaterSpringNote(),
                s.getWaterSummerNote(),
                s.getWaterAutumnNote(),
                s.getWaterWinterNote(),
                s.getSourceUrl(),
                s.getImageUrl()
        );
    }
}
