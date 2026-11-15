package com.example.plantapi.service;
/* 회원가입 + 로그인 로직 */
import com.example.plantapi.domain.User;
import com.example.plantapi.dto.AuthResponse;
import com.example.plantapi.dto.LoginRequest;
import com.example.plantapi.dto.SignupRequest;
import com.example.plantapi.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository(); // "로그인 정보를 세션에 저장해줘"

    /* 회원가입 */
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다");
        }

        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password())) // 비밀번호 해시로 바꿔서 저장
                .nickname(request.nickname())
                .build();

        return AuthResponse.from(userRepository.save(user)); // save()로 DB에 저장하고, AuthResponse로 컨트롤러에 돌려줌
    }

    /* 로그인 */
    public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        // 이메일 + 비밀번호가 맞는지 시큐리티가 확인해. 틀리면 여기서 예외가 나
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        SecurityContext context = SecurityContextHolder.createEmptyContext(); // 성공하면 SecurityContext에 로그인 정보를 넣고
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse); // 세션에 저장

        User user = userRepository.findByEmail(request.email()).orElseThrow();
        return AuthResponse.from(user); // 유저 정보를 찾아서 돌려줌
    }
}
