package com.example.frotaapibackend.dtos;

import com.example.frotaapibackend.models.UserRole;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
    @NotBlank(message = "É necessário um login válido") String login, 
    @NotBlank(message = "É necessário uma senha válida") String password, 
    @NotNull(message = "É necessário uma role válida") UserRole role) {
    
}
