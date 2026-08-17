package com.hydroharvest.dto;

import com.hydroharvest.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class AuthRequest {

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Login {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Register {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String fullName;
        private String organization;
        private String phoneNumber;
        private Role role;
    }
}
