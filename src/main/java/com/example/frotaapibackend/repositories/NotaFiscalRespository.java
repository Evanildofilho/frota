package com.example.frotaapibackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.frotaapibackend.models.NotaFiscal;

public interface NotaFiscalRespository extends JpaRepository<NotaFiscal, Long> {
    Boolean existsByNumeroNotaFiscal(Long numeroNotaFiscal);
    NotaFiscal findByNumeroNotaFiscal (Long numeroNotaFiscal);
}
