// SignupRequest.java
package com.example.plantapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 4, message = "비밀번호는 4자 이상이어야 합니다") String password,
        @NotBlank @Size(max = 50) String nickname
) {}
