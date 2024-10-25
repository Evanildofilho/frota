package com.example.frotaapibackend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity
@Table( name = "veiculos")
public class Veiculo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVeiculo;
    
    @Column(unique = true)
    private String placa;
    private String marca;
    private int km;
    private int ano_fabricado;
    private float consumo;
    private float valor;
    private String modelo; //Caminhão,Carro,Moto,Avião......
    private boolean activated;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    
}
