package com.example.plantapi.security;
/* 문지기 */
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean // @Bean: 객체를 만들면, 필요할 때 꺼내 쓸 수 있게 함 (AuthService나 AuthController에서 주입 받아 쓸 수 있음)
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호를 해시로 바꿈 ($2a$10$...)
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager(); // AuthService에서 사용
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // API로만 쓰니까 csrf 검사 끔
                .formLogin(form -> form.disable()) // 스프링이 주는 기본 로그인 페이지, 안 씀
                .httpBasic(basic -> basic.disable()) // 브라우저 기본 로그인 팝업도 안 씀
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/api/species/**", "/uploads/**").permitAll() // 이 3개는 로그인 없이 들어갈 수 있음
                        .anyRequest().authenticated() // 나머지는 전부 로그인 해야함
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 필요할 때만 세션을 만듦. 로그인할 때 생김
                );
        return http.build();
    }
}
