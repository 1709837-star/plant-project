package com.example.plantapi.dto;

import com.example.plantapi.domain.WateringLog;
import java.time.LocalDate;

public record WateringLogResponse(Long id, Long myPlantId, LocalDate wateredDate, String memo) {
    public static WateringLogResponse from(WateringLog log) {
        return new WateringLogResponse(
                log.getId(), log.getMyPlant().getId(), log.getWateredDate(), log.getMemo());
    }
}
