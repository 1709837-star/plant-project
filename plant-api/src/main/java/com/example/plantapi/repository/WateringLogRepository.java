// src/main/java/com/example/plantapi/repository/WateringLogRepository.java
package com.example.plantapi.repository;

import com.example.plantapi.domain.WateringLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WateringLogRepository extends JpaRepository<WateringLog, Long> {
    List<WateringLog> findByMyPlantIdOrderByWateredDateDesc(Long myPlantId);
}
