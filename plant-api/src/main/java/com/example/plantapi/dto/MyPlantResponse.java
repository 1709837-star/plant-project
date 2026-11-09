package com.example.plantapi.dto;

import com.example.plantapi.domain.MyPlant;
import java.time.LocalDate;

public record MyPlantResponse(
        Long id,
        Long speciesId,
        String speciesName,
        String nickname,
        String location,
        Integer wateringIntervalDays,
        Integer effectiveIntervalDays,
        LocalDate lastWateredDate,
        LocalDate nextWateringDate,
        Long dDay,
        LocalDate adoptedDate,
        String memo,
        String photoUrl
) {
    public static MyPlantResponse from(MyPlant p) {
        return new MyPlantResponse(
                p.getId(),
                p.getSpecies() != null ? p.getSpecies().getId() : null,
                p.getSpecies() != null ? p.getSpecies().getName() : null,
                p.getNickname(),
                p.getLocation(),
                p.getWateringIntervalDays(),
                p.getEffectiveWateringIntervalDays(),
                p.getLastWateredDate(),
                p.getNextWateringDate(),
                p.getDDay(),
                p.getAdoptedDate(),
                p.getMemo(),
                p.getPhotoUrl()
        );
    }
}
