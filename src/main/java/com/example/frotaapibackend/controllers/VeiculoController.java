package com.example.frotaapibackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.frotaapibackend.dtos.VeiculoRecordDto;

import com.example.frotaapibackend.services.VeiculoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("veiculo")
public class VeiculoController {
    
    @Autowired
    VeiculoService veiculoService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarVeiculo(@RequestBody @Valid VeiculoRecordDto veiculoRecordDto){
        return veiculoService.cadastrarVeiculo(veiculoRecordDto);
    }
    
    @GetMapping("")
    public ResponseEntity<?> veiculosCadastrados(){
        return veiculoService.veiculosCadastrados();
    }

    @GetMapping("/{placa}")
    public ResponseEntity<?> veiculoPorPlaca(@PathVariable String placa){
        return veiculoService.veiculoPorPlaca(placa);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterarDadosVeiculo(@RequestBody @Valid VeiculoRecordDto veiculoRecordDto){
        return veiculoService.alterarDadosVeiculo(veiculoRecordDto);
    }

    @DeleteMapping("/deletar/{placa}")
    public ResponseEntity<?> deletarVeiculo(@PathVariable String placa){
        return veiculoService.deletarVeiculo(placa);
    }
    
}
