package com.example.plantapi.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "watering_log")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "myPlant")
public class WateringLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어느 내 식물의 기록인지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_plant_id", nullable = false)
    private MyPlant myPlant;

    // 물 준 날, 기본값은 오늘 (서비스에서 넣어줘)
    @Column(nullable = false)
    private LocalDate wateredDate;

    // 메모
    @Column(length = 500)
    private String memo;
}
