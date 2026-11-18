package com.example.plantapi.dto;

import com.example.plantapi.domain.MyPlant;
import java.time.LocalDate;
// {} 안에 from()이라는 메소드가 들어 있음 (엔터터티를 응답용으로 바꾸는 공장)
// request는 들어오는 것 - 프론트가 보낸 JSON을 스프링이 자동으로 이 record로 바꿔줌 (@RequestBody가 하는 일)
// 그에 반해 response는 나가는 것 - 엔터티를 프론트에 보낼 형태로 바꿔야 함 (from())

// record ... (Long id, String nickname, ...) : DTO필드. 프론트에 보낼 항목들
// from(MyPlant p) : 파라미터. 변환할 엔터티를 받는 자리

//DB에서 MyPlant 엔티티를 가져와
//  → 서비스에서 MyPlantResponse.from(엔티티)로 DTO로 바꿔
//    → 컨트롤러에게 DTO를 돌려줘
//      → 컨트롤러가 return 해
//        → 스프링이 JSON으로 바꿔서 프론트에 보내

public record MyPlantResponse(
        Long id,
        Long speciesId,
        String speciesName,
        String nickname,
        String location,
        Integer wateringIntervalDays,
        Integer effectiveIntervalDays,
        LocalDate lastWateredDate,
        LocalDate nextWateringDate,
        Long dDay,
        LocalDate adoptedDate,
        String memo,
        String photoUrl
) {
    public static MyPlantResponse from(MyPlant p) {
        return new MyPlantResponse(
                p.getId(),
                p.getSpecies() != null ? p.getSpecies().getId() : null, // 도감에 없는 식물로 직접 등록했으면, null을 넣어.
                p.getSpecies() != null ? p.getSpecies().getName() : null,
                p.getNickname(),
                p.getLocation(),
                p.getWateringIntervalDays(),
                p.getEffectiveWateringIntervalDays(),
                p.getLastWateredDate(),
                p.getNextWateringDate(),
                p.getDDay(),
                p.getAdoptedDate(),
                p.getMemo(),
                p.getPhotoUrl()
        );
    }
}
