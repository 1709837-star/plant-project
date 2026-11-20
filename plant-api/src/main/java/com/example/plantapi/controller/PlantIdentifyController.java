package com.example.plantapi.controller;

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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantIdentifyController {

    private final SpeciesRepository speciesRepository;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("http://127.0.0.1:8000")
            .build();

    @PostMapping(value = "/identify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IdentifyResponse identify(@RequestParam("file") MultipartFile file) throws Exception {
        // 1. FastAPI에 사진 보내기
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        Map<String, Object> result = restClient.post()
                .uri("/predict")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(Map.class);

        // 2. 결과 꺼내기
        String speciesName = (String) result.get("species_name");
        Double confidence = result.get("confidence") != null
                ? ((Number) result.get("confidence")).doubleValue() : 0.0;
        Boolean isUnknown = (Boolean) result.get("is_unknown");
        List<Map<String, Object>> top3Raw = (List<Map<String, Object>>) result.get("top3");

        List<IdentifyResponse.TopItem> top3 = top3Raw.stream()
                .map(m -> new IdentifyResponse.TopItem(
                        (String) m.get("korean"),
                        (String) m.get("english"),
                        ((Number) m.get("confidence")).doubleValue()))
                .toList();

        // 3. 도감에서 id 찾기
        Long speciesId = null;
        if (speciesName != null) {
            Species species = speciesRepository.findByName(speciesName).orElse(null);
            if (species != null) {
                speciesId = species.getId();
            }
        }

        return new IdentifyResponse(speciesName, speciesId, confidence, isUnknown, top3);
    }
}
