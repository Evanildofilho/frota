package com.example.frotaapibackend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AbastecimentoRecordDto(
    @NotEmpty(message = "Informe uma placa válida") String placa,
    @NotNull(message = "Informe a litragem válida") @Min(1) float litros,
    @NotNull(message = "Informe um km válido") @Min(1) int km
) {}
