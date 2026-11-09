package com.example.plantapi.security;
/* 스프링 시큐리티가 "이 이메일 유저가 누구야?" 하고 물을 때 답해주는 파일 */
import com.example.plantapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.example.plantapi.domain.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일의 사용자가 없습니다"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(), // DB에 저장된 BCrypt 해시
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
