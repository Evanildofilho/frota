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

import com.example.frotaapibackend.dtos.AbastecimentoAlterarRecordDto;
import com.example.frotaapibackend.dtos.AbastecimentoRecordDto;

import com.example.frotaapibackend.services.AbastecimentoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("abastecimento")
public class AbastecimentoController {
    @Autowired
    AbastecimentoService abastecimentoService;

    @PostMapping("")
    public ResponseEntity<?> cadastroAbastecimento(@RequestBody @Valid AbastecimentoRecordDto abastecimentoRecordDto){
        return abastecimentoService.cadastroAbastecimento(abastecimentoRecordDto);
    }

    @GetMapping("")
    public ResponseEntity<?> abastecimentosCadastrados(){
        return abastecimentoService.abastecimentosCadastrados();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> abastecimentoPorId(@PathVariable Long id){
        return abastecimentoService.abastecimentoPorId(id);
    }

    @GetMapping("/placa/{placa}")
    public ResponseEntity<?> abastecimentosPorPlaca(@PathVariable String placa){
        return abastecimentoService.abastecimentosPorPlaca(placa);
    }

    @PutMapping("")
    public ResponseEntity<?> alterarAbastecimento(@RequestBody @Valid AbastecimentoAlterarRecordDto abastecimentoAlterarRecordDto){
        return abastecimentoService.alterarAbastecimento(abastecimentoAlterarRecordDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarPorId(@PathVariable Long id){
        return abastecimentoService.deletarPorId(id);
    }
}
