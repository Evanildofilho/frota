package com.example.frotaapibackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.frotaapibackend.models.Abastecimento;
import com.example.frotaapibackend.models.Veiculo;

public interface AbastecimentoRepository extends JpaRepository<Abastecimento, Long>{
    List<Abastecimento> findAllByVeiculo(Veiculo veiculo);

    Abastecimento findByidAbasteciemento(long id);
}
