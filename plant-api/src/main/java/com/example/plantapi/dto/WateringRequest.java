package com.example.plantapi.dto;
/* 물주기 들어오는 것 */
// 물주기 버튼을 누를 때 프론트가 보내는 JSON
import java.time.LocalDate;

public record WateringRequest(
        LocalDate wateredDate, // 비우면 오늘 날짜
        String memo
) {}
