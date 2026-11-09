package com.example.plantapi.controller;

import com.example.plantapi.dto.AuthResponse;
import com.example.plantapi.dto.LoginRequest;
import com.example.plantapi.dto.SignupRequest;
import com.example.plantapi.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request,
                              HttpServletRequest httpRequest,
                              HttpServletResponse httpResponse) {
        return authService.login(request, httpRequest, httpResponse);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    // 로그인한 내가 누군지 확인용. 로그인 안 했으면 403이 나
    @GetMapping("/me")
    public AuthResponse me(Authentication authentication) {
        String email = authentication.getName();
        // 간단히 하기 위해 이메일만으로 다시 조회하는 대신, 아래는 로그인 때와 같은 응답 형태야
        // 실제 조회가 필요하면 AuthService에 findByEmail을 추가해줘
        return new AuthResponse(null, email, null);
    }
}
