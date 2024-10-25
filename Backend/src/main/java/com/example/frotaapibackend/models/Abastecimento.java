package com.example.frotaapibackend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table( name = "abastecimentos")

public class Abastecimento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAbasteciemento;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;
    private float litros;
    private int km;
    private boolean activated;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
