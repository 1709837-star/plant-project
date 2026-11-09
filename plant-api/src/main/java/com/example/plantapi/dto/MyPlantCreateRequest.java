package com.example.plantapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record MyPlantCreateRequest(
        Long speciesId, // 도감에서 고르면 넣고, 직접 등록이면 null
        @NotBlank String nickname,
        String location,
        Integer wateringIntervalDays, // 비우면 도감 간격을 써
        @NotNull LocalDate lastWateredDate,
        LocalDate adoptedDate,
        String memo
) {}
