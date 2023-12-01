package com.example.frotaapibackend.dtos;

import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AbastecimentoAlterarRecordDto(
    @NotNull(message = "Informe um id de abastecimento válido") UUID idAbasteciemento,
    @NotNull(message = "Informe a litragem válida") @Min(1) float litros,
    @NotNull(message = "Informe um km válido") @Min(1) int km
) {}
