package com.example.frotaapibackend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.frotaapibackend.models.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, UUID>{
    
    boolean existsByPlaca(String placa);

    Veiculo findByPlaca(String placa);
}
