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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

        String speciesName = (String) result.get("species_name");
        Double confidence = result.get("confidence") != null
                ? ((Number) result.get("confidence")).doubleValue() : 0.0;
        Boolean isUnknown = (Boolean) result.get("is_unknown");
        List<Map<String, Object>> top3Raw = (List<Map<String, Object>>) result.get("top3");
        if (top3Raw == null) {
            top3Raw = new ArrayList<>();
        }

        Long speciesId = null;
        String imageUrl = null;
        if (speciesName != null) {
            Optional<Species> found = speciesRepository.findFirstByNameContaining(speciesName);
            if (found.isPresent()) {
                speciesId = found.get().getId();
                imageUrl = found.get().getImageUrl();
            }
        }

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

        return new IdentifyResponse(speciesName, speciesId, imageUrl, confidence, isUnknown, top3);
    }
}

