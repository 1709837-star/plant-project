package com.example.plantapi.dto;
/* 회원 정보 나가는 것 */
// 그래서 from(엔터티)

import com.example.plantapi.domain.User;

public record AuthResponse(Long id, String email, String nickname) {
    public static AuthResponse from(User user) {
        return new AuthResponse(user.getId(), user.getEmail(), user.getNickname());
    }
}
