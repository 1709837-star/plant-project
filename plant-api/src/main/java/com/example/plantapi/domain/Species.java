package com.example.plantapi.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "species", indexes = {
        @Index(name = "idx_species_name", columnList = "name"),
        @Index(name = "idx_species_light", columnList = "light_level")
})
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Species extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 식물 이름, 크롤링 중복 방지용으로 unique
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    // 학명, 예: Monstera deliciosa
    @Column(length = 200)
    private String scientificName;

    // 광도: LOW / MEDIUM / HIGH
    @Column(length = 20)
    private String lightLevel;

    // 난이도: 초보자 / 경험자 / 전문가
    @Column(length = 20)
    private String difficulty;

    // 겨울 최저온도(℃), 예: 몬스테라 10
    private Integer minWinterTemp;

    // 계절별 물주기 일수, 크롤링 정제 단계에서 문장을 일수로 바꿔서 넣는 값
    // 못 바꾸면 null로 두면 돼
    private Integer waterSpringDays;
    private Integer waterSummerDays;
    private Integer waterAutumnDays;
    private Integer waterWinterDays;

    // 크롤링 원문, 예: "겉흙이 마르면 충분히"
    @Column(length = 1000)
    private String waterNote;

    // 출처, 농사로 상세 주소
    @Column(length = 500)
    private String sourceUrl;

    // 도감 대표 사진 URL, 크롤링으로 가져온 img 주소만 저장해. 파일 다운로드는 안 해
    @Column(length = 500)
    private String imageUrl;

    // 오늘 월(1~12)을 주면, 그 계절의 물주기 일수를 돌려줘
    // D-day 계산할 때 MyPlant 쪽에서 이걸 부르게 될 거야
    public Integer getWateringIntervalDays(int month) {
        if (month >= 3 && month <= 5) {
            return waterSpringDays;
        }
        if (month >= 6 && month <= 8) {
            return waterSummerDays;
        }
        if (month >= 9 && month <= 11) {
            return waterAutumnDays;
        }
        return waterWinterDays; // 12, 1, 2월
    }
}