package com.example.plantapi.controller;
/* 접수처 */
import com.example.plantapi.domain.User;
import com.example.plantapi.dto.AuthResponse;
import com.example.plantapi.dto.LoginRequest;
import com.example.plantapi.dto.SignupRequest;
import com.example.plantapi.repository.UserRepository;
import com.example.plantapi.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /* 회원가입 */
    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
        // 브라우저가 프론트엔드 app/api/auth/signup에서 body에 { email, password, nickname }을 JSON으로 보냄
        // 스프링이 @RequestBody를 보고, 그 JSON을 SignupRequest로 바꿔서 request 변수에 넣어줌
        return authService.signup(request);
        // 그걸 Service에 넘김
        // @Valid: SignupRequest에 있는 검증을 확인
    }

    /* 로그인 */
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request,
                              HttpServletRequest httpRequest,
                              HttpServletResponse httpResponse) {
        // 브라우저가 보낸 { email, password }가 LoginRequest로 바뀌어서 request에 들어감
        // HttpServletRequest : 들어오는 HTTP 요청 그 자체 (헤더, 쿠키, 세션, body 등)
        // HttpServletResponse : 나가는 HTTP 응답 그 자체 (헤더를 붙이거나, 쿠키를 심거나 등)

        return authService.login(request, httpRequest, httpResponse);
    }

    /* 로그아웃 */
    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        // 지금 세션을 가져옴. false: "새로 만들지 말고 null을 줘."
        if (session != null) {
            session.invalidate(); // 세션 지우기
        }
    }

    /* 내 정보 */
    // 로그인한 내가 누군지 확인용. 로그인 안 했으면 403이 나
    // authentication에는 로그인한 사람의 정보가 들어있음
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow();
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "nickname", user.getNickname()
        ));
    }

    /* 비밀번호 변경 */
    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestBody Map<String, String> body,
            Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow();
        if (!passwordEncoder.matches(body.get("currentPassword"), user.getPassword())) {
            return ResponseEntity.status(400).body(Map.of("message", "현재 비밀번호가 틀렸습니다"));
        } // 현재 비밀번호가 맞는지
        user.changePassword(passwordEncoder.encode(body.get("newPassword")));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다"));
    }

}
