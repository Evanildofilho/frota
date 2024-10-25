package com.example.frotaapibackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.frotaapibackend.models.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long>{
    
    boolean existsByPlaca(String placa);

    Veiculo findByPlaca(String placa);
}
