package com.example.plantapi.controller;
/* 사진 받아서 FastAPI에 물어보는 곳 */
import com.example.plantapi.domain.Species;
import com.example.plantapi.dto.IdentifyResponse;
import com.example.plantapi.repository.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantIdentifyController {

    private final SpeciesRepository speciesRepository; // DB에서 종을 찾는 도구
    private final RestClient restClient = RestClient.builder() // restClient: FastAPI에 요청을 보내는 도구
            .baseUrl("http://127.0.0.1:8000") // 나중에 .url("/predict")라고 하면 http://127.0.0.1:8000
            .build();
    // 서비스로 안 가고 바로 repository로 감. 여기는 로직이 "FastAPI에 물어보고, DB에서 id만 찾기"라서 간단

    /* (1) 사진 받기 */
    @PostMapping(value = "/identify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IdentifyResponse identify(@RequestParam("file") MultipartFile file) throws Exception {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // 폼 데이터. MultiValueMap: key 하나에 값을 여러 개 담을 수 있음.
        body.add("file", new ByteArrayResource(file.getBytes()) {
            // FastAPI가 "file"이라는 이름으로 받기로 되어 있음.
            // file.getBytes(): 사진 파일을 바이트(숫자 덩어리)로 바꿈.
            // ByteArrayResource: 바이트를 파일처럼 감쌈. RestClient는 Resource를 받아야 사진으로 보내줌
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
                // 사진을 바이트로 바꾼 것에, 파일 이름을 붙임 (FastAPI는 파일 이름이 있어야 파일인줄 안대)
                // 그래서 원래 이름(photo.jpg)으로 돌려줌 (화면상에 파일명 그대로 나오는 이유)
            }
        });

        /* (2) FastAPI에 넘기기 */
        Map<String, Object> result = restClient.post()
                .uri("/predict")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(Map.class);
        // contentType : 사진 보내는 형식이라고 알려줌
        // body(body) : body에 위에서 만든 body를 넣음
        // .body(Map.class): 돌아온 JSON을 Map으로 받아
        // 스프링이 직접 모델을 돌리는 게 아니라, FastAPI:8000/predict에 사진을 넘김(POST). 결과는 Map으로 받음
        // result 모양 : {"species_name": "몬스테라", "confidence": 0.99, "is_unknown": false, "top3": [...]}

        /* (3) 결과 꺼내기 */
        // FastAPI main.py에서
        //{
        //    "species_name": "몬스테라",
        //    "confidence": 0.99,
        //    "is_unknown": False,
        //    "top3": [...]
        //} 이렇게 옴
        // get("species_name") 하면 "몬스테라"가 speciesName에 들어감
        // 제일 마지막에 return new IdentifyResponse(speciesName, ..) 여기에 들어감. 이게 DTO
        // 스프링이 DTO를 JSON으로 바꿔서 프론트 모달로 전달
        String speciesName = (String) result.get("species_name");
        Double confidence = result.get("confidence") != null
                ? ((Number) result.get("confidence")).doubleValue() : 0.0;
        Boolean isUnknown = (Boolean) result.get("is_unknown");
        List<Map<String, Object>> top3Raw = (List<Map<String, Object>>) result.get("top3");
        if (top3Raw == null) {
            top3Raw = new ArrayList<>(); // 목록이 null이면 빈 리스트로 바꿈 - for문 터짐 방지
        }

        /* (4) 1위 이름으로 도감에서 찾기 */
        Long speciesId = null;
        String imageUrl = null;
        if (speciesName != null) {
            Optional<Species> found = speciesRepository.findFirstByNameContaining(speciesName);
            // 모델이 준 이름은 "마란타", DB이름은 "마란다, 마란타" - 정확히 일치하는 firstByName으로는 못 찾음
            if (found.isPresent()) {
                speciesId = found.get().getId();
                imageUrl = found.get().getImageUrl();
            } // 찾으면 id랑 사진 주소 가져와. 못 찾으면 null로 둬.
        }

        /* (5) 반복문 돌면서 top3 만들기 - (4)와 똑같은 방법 */
        List<IdentifyResponse.TopItem> top3 = new ArrayList<>();
        for (Map<String, Object> m : top3Raw) {
            String korean = (String) m.get("korean");
            Long topSpeciesId = null;
            Optional<Species> foundTop = speciesRepository.findFirstByNameContaining(korean);
            if (foundTop.isPresent()) {
                topSpeciesId = foundTop.get().getId();
            }
            top3.add(new IdentifyResponse.TopItem(
                    korean,
                    (String) m.get("english"),
                    topSpeciesId,
                    ((Number) m.get("confidence")).doubleValue()));
        }

        /* (6) 결과 돌려주기 - 프론트가 받아서 모달에 보여줌 */
        return new IdentifyResponse(speciesName, speciesId, imageUrl, confidence, isUnknown, top3);
    }   // {"speciesName": "몬스테라", "speciesId": 1, "confidence": 0.99, ...}

        // 프론트 모달에서 이렇게 받음
        // const res = await fetch("/api/plants/identify", { method: "POST", body: formData });
        //setResult(await res.json());

}

