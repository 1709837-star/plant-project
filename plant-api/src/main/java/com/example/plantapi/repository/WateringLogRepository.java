package com.example.plantapi.repository;
/* 물 주기 */
import com.example.plantapi.domain.WateringLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WateringLogRepository extends JpaRepository<WateringLog, Long> {
    List<WateringLog> findByMyPlantIdOrderByWateredDateDesc(Long myPlantId);
    // 메소드 이름이 곧 쿼리. "이 식물의 기록을, 물 준 날짜 내림차순으로 가져와."
}
