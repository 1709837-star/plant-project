package com.example.plantapi.dto;
/* FastAPI에서 받은 결과를 프론트에 보내는 형태 */
import java.util.List;

public record IdentifyResponse(
        String speciesName,
        Long speciesId,
        Double confidence,
        Boolean isUnknown,
        List<TopItem> top3
) {
    public record TopItem(String korean, String english, Double confidence) {}
}
