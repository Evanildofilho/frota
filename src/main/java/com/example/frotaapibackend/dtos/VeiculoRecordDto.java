package com.example.frotaapibackend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VeiculoRecordDto( 
    @NotBlank(message = "Informe uma placa válida") String placa, 
    @NotBlank(message = "Informe uma marca válida") String marca, 
    @NotNull(message = "Informe um km válido") @Min(0) int km,
    @NotNull(message = "Informe um ano válido") @Min(1900) int ano_fabricado, 
    @NotNull(message = "Informe um consumo válido") @Min(1) float consumo, 
    @NotNull(message = "Informe valor válido") float valor,
    @NotBlank(message = "Informe modelo válido") String modelo
    ) {}
