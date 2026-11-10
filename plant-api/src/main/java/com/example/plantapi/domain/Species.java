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

    // [상세정보] 분류, 예: 관엽식물
    @Column(length = 50)
    private String category;

    // [상세정보] 생육형태, 예: 직립형
    @Column(length = 50)
    private String growthForm;

    // [상세정보] 생장높이, 예: 30~60cm — 숫자+단위가 섞여서 String으로 가
    @Column(length = 50)
    private String growthHeight;

    // [상세정보] 생장너비, 예: 30~50cm
    @Column(length = 50)
    private String growthWidth;

    // [관리정보] 배치장소, 예: 거실 창측
    @Column(length = 100)
    private String placement;

    // [관리정보] 생육적온, 예: 18~25°C
    @Column(length = 50)
    private String optimalTemp;

    // [관리정보] 습도, 예: 40~70%
    @Column(length = 50)
    private String humidity;

    // 광도: LOW / MEDIUM / HIGH
    @Column(length = 20)
    private String lightLevel;

    // 난이도: 초보자 / 경험자 / 전문가
    @Column(length = 20)
    private String difficulty;

    // 겨울 최저온도(℃), 예: 몬스테라 10
    private Integer minWinterTemp;

    // 크롤링 원문, 예: "겉흙이 마르면 충분히"
    @Column(length = 1000)
    private String waterNote;

    // 계절별 물주기 이미지 URL (농사로 gif 주소 그대로 저장)
    @Column(length = 500)
    private String waterSpringImg;

    @Column(length = 500)
    private String waterSummerImg;

    @Column(length = 500)
    private String waterAutumnImg;

    @Column(length = 500)
    private String waterWinterImg;

    // 계절별 물주기 문장 (이미지 alt 텍스트)
    @Column(length = 500)
    private String waterSpringNote;

    @Column(length = 500)
    private String waterSummerNote;

    @Column(length = 500)
    private String waterAutumnNote;

    @Column(length = 500)
    private String waterWinterNote;


    // 출처, 농사로 상세 주소
    @Column(length = 500)
    private String sourceUrl;

    // 도감 대표 사진 URL, 크롤링으로 가져온 img 주소만 저장해. 파일 다운로드는 안 해
    @Column(length = 500)
    private String imageUrl;

}