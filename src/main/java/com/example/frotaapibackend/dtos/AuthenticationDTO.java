package com.example.frotaapibackend.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationDTO(
    @NotBlank(message = "Envie um login válido") String login, 
    @NotBlank(message = "Envie um login válido") String password) {
}
