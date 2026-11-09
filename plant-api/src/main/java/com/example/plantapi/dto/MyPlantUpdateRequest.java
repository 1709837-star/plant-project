package com.example.plantapi.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record MyPlantUpdateRequest(
        @NotBlank String nickname,
        String location,
        Integer wateringIntervalDays,
        LocalDate lastWateredDate,
        LocalDate adoptedDate,
        String memo
) {}
