package com.example.plantapi.dto;
/* 물주기 기록이 나가는 것 */
// 그래서 from()이 있음 - WateringLog 엔터티를 받아서 응답용으로 바꿔줌
import com.example.plantapi.domain.WateringLog;
import java.time.LocalDate;

public record WateringLogResponse(Long id, Long myPlantId, LocalDate wateredDate, String memo) {
    public static WateringLogResponse from(WateringLog log) {
        return new WateringLogResponse(
                log.getId(),
                log.getMyPlant().getId(),
                log.getWateredDate(),
                log.getMemo());
    }
}
