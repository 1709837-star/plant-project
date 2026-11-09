// src/main/java/com/example/plantapi/dto/WateringRequest.java
package com.example.plantapi.dto;

import java.time.LocalDate;

public record WateringRequest(
        LocalDate wateredDate, // 비우면 오늘이야
        String memo
) {}
