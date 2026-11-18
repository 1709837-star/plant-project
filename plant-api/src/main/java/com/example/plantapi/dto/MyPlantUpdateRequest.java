package com.example.plantapi.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
// request는 들어오는 것 - 프론트가 보낸 JSON을 스프링이 자동으로 이 record로 바꿔줌 (@RequestBody가 하는 일)
// 그에 반해 response는 나가는 것 - 엔터티를 프론트에 보낼 형태로 바꿔야 함 (from())
public record MyPlantUpdateRequest(
        @NotBlank String nickname,
        String location,
        Integer wateringIntervalDays,
        LocalDate lastWateredDate,
        LocalDate adoptedDate,
        String memo
) {}
