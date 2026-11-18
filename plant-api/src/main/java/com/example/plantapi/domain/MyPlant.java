package com.example.plantapi.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "my_plant")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "wateringLogs") // 기록이 수백 개일 때 출력이 너무 길어짐
public class MyPlant extends BaseEntity{

    /* 내 식물 id */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* 도감 식물 (종류) */
    // nullable 안 적혀있음 - 도감에 없는 식물도 직접 등록 가능
    @ManyToOne(fetch = FetchType.LAZY) // 여러 개의 내 식물이 하나의 도감 식물을 가리킬 수 있음
    @JoinColumn(name = "species_id")
    private Species species;

    /* 누구 식물인지 */
    // 로그인 필수라 비울 수 없음
    @ManyToOne(fetch = FetchType.LAZY) // 여러 개의 내 식물이 한 명의 유저를 가리킴
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    // 별명, 예: 몬스 1호
    @Column(nullable = false, length = 100)
    private String nickname;

    // 놓은 장소, 예: 거실 창가
    @Column(length = 100)
    private String location;

    // 직접 입력한 물주기 간격(일). null이면 도감의 오늘 계절 일수를 씀
    private Integer wateringIntervalDays;

    // 마지막으로 물 준 날
    @Column(nullable = false)
    private LocalDate lastWateredDate;

    // 들여온 날
    private LocalDate adoptedDate;

    // 메모
    @Column(length = 500)
    private String memo;

    // 내가 올린 내 식물 사진 경로, 예: /uploads/my-plants/3_xxx.jpg. 없으면 null
    @Column(length = 500)
    private String photoUrl;


    /* 물 준 기록들 */
    // 내 식물 지우면 기록도 같이 지워짐
    @OneToMany(mappedBy = "myPlant", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<WateringLog> wateringLogs = new ArrayList<>();

    /* D-day 계산 */
    // (1) 물주기 간격
    public Integer getEffectiveWateringIntervalDays() {
        return wateringIntervalDays;
    }


    // (2) 다음 물 줄 날 = 마지막 물 준 날 + 간격
    public LocalDate getNextWateringDate() {
        Integer interval = getEffectiveWateringIntervalDays();
        if (interval == null) {
            return null;
        }
        return lastWateredDate.plusDays(interval);
    }

    // (3) D-day: 0이면 오늘, 음수면 지난 거야. 서버 시간 기준
    public Long getDDay() {
        LocalDate next = getNextWateringDate();
        if (next == null) {
            return null;
        }
        return ChronoUnit.DAYS.between(LocalDate.now(), next); // 두 날짜 사이의 일수를 셈
    }

    /* 물주기 버튼 */
    // 물주기 버튼을 누르면 서비스가 이걸 부름. 마지막 물 준 날을 오늘로 바꾸고, D-day가 다시 계산
    public void markWatered(LocalDate wateredDate) {
        this.lastWateredDate = wateredDate;
    }

    // 수정: species는 안 바꿔. 도감 바꾸고 싶으면 새로 등록하는 걸로
    public void change(String nickname, String location, Integer wateringIntervalDays,
                       LocalDate lastWateredDate, LocalDate adoptedDate, String memo) {
        this.nickname = nickname;
        this.location = location;
        this.wateringIntervalDays = wateringIntervalDays;
        this.lastWateredDate = lastWateredDate;
        this.adoptedDate = adoptedDate;
        this.memo = memo;
    }

    // 사진만 따로 바꿔. change()에 안 넣는 이유: 사진 업로드는 multipart API에서만 처리하니까
    public void updatePhoto(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
