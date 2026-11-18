package com.example.plantapi.dto;
/* 로그인 들어오는 것 */
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password
) {}
