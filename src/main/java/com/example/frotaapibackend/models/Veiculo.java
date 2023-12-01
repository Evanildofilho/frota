package com.example.frotaapibackend.models;

import java.time.LocalDateTime;
import java.util.UUID;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idVeiculo;
    private String placa;
    private String marca;
    private int km;
    private int ano_fabricado;
    private float consumo;
    private float valor;
    private String modelo; //Caminhão,Carro,Moto,Avião......
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    
}
