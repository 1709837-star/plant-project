package com.example.plantapi.dto;
/* FastAPI에서 받은 결과를 프론트에 보내는 형태 */
import java.util.List;
// 사진 올리고 받는 모달창에 필요한 요소들
// response 결과가 엔터티에서 오는 게 아니라, FastAPI에서 온 Map, DB에서 찾은 id/사진을 합쳐서 만드는 거라
// MyplantResponse처럼 from(엔터티)가 필요 없음
public record IdentifyResponse(
        String speciesName,
        Long speciesId,
        String imageUrl,
        Double confidence, // 99% 확신
        Boolean isUnknown, // 95% 미만이면 true - 모르겠어요
        List<TopItem> top3
) {
    public record TopItem(String korean, String english, Long speciesId, Double confidence) {}
} // top3는 1-3위 목록. 한 개마다 이름, 영어이름, id, 확신도가 필요
