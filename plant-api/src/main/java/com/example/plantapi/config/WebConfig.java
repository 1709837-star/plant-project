package com.example.plantapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 설정 파일 표시
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                // "로그인 없이 봐도 돼"
                .addResourceLocations("file:uploads/");
                // 브라우저가 /uploads/my-plants/3_ ... jpg 주소 요청하면, "디스크의 /uploads/폴더에서 찾아줘." 라고 알려줌

    }
}
