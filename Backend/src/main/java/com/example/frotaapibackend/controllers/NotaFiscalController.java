package com.example.frotaapibackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.frotaapibackend.dtos.NotaFiscalAlterarRecordDTO;
import com.example.frotaapibackend.dtos.NotaFiscalRecordDTO;
import com.example.frotaapibackend.services.NotaFiscalService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("nota_fiscal")
public class NotaFiscalController {
    
    @Autowired
    NotaFiscalService notaFiscalService;

    @GetMapping("")
    public ResponseEntity<?> notaFiscalsCadastrados(){
        return notaFiscalService.notaFiscalsCadastrados();
    }

    @GetMapping("/{numero}")
    public ResponseEntity<?> notaFiscalPorNumero(@PathVariable Long numero){
        return notaFiscalService.notaFiscalPorNumero(numero);
    }

    @PostMapping("")
    public ResponseEntity<?> cadastrarNotaFiscal(@RequestBody @Validated NotaFiscalRecordDTO NotaFiscalDTO){
        return notaFiscalService.notaFiscalsCadastrar(NotaFiscalDTO);
    }

    @PutMapping("")
    public ResponseEntity<?> alterarNotaFiscal(@RequestBody @Validated NotaFiscalAlterarRecordDTO NotaFiscalAlterarDTO){
        return notaFiscalService.alterarDadosNotaFiscal(NotaFiscalAlterarDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarNotaFiscal(@PathVariable Long id){
        return notaFiscalService.notaFiscalsDeletar(id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> cadastrarNotaFiscal(@PathVariable Long id){
        return notaFiscalService.notaFiscalDesativar(id);
    }

    public ResponseEntity<?> desativarNotaFiscal(@PathVariable Long numeroNotaFiscal){
        return notaFiscalService.notaFiscalDesativar(numeroNotaFiscal);
    }
}
