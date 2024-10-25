package com.example.frotaapibackend.services;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.frotaapibackend.dtos.NotaFiscalRecordDTO;
import com.example.frotaapibackend.dtos.NotaFiscalAlterarRecordDTO;
import com.example.frotaapibackend.models.NotaFiscal;
import com.example.frotaapibackend.repositories.NotaFiscalRespository;

@Service
public class NotaFiscalService {
    
    @Autowired
    NotaFiscalRespository notaFiscalRepository;

    public ResponseEntity<?> notaFiscalsCadastrados(){
        return ResponseEntity.status(HttpStatus.OK).body(notaFiscalRepository.findAll());
    }

    public ResponseEntity<?> notaFiscalPorId(Long id){
        if(notaFiscalRepository.existsById(id) == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NotaFiscal não encontrado!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(notaFiscalRepository.findById(id));
    }

    public ResponseEntity<?> notaFiscalPorNumero(Long numero){
        if(notaFiscalRepository.existsByNumeroNotaFiscal(numero) == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NotaFiscal não encontrado!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(notaFiscalRepository.findByNumeroNotaFiscal(numero));
    }

    public ResponseEntity<?> notaFiscalsCadastrar(NotaFiscalRecordDTO NotaFiscalDTO){
        if(notaFiscalRepository.existsByNumeroNotaFiscal(NotaFiscalDTO.numeroNotaFiscal()) == false){
            NotaFiscal novoNotaFiscal = new NotaFiscal();
            BeanUtils.copyProperties(NotaFiscalDTO, novoNotaFiscal);
            LocalDateTime dataHoraAtual = LocalDateTime.now();
            novoNotaFiscal.setCreated_at(dataHoraAtual);
            return ResponseEntity.status(HttpStatus.CREATED).body(notaFiscalRepository.save(novoNotaFiscal));
        }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nº de nota fiscal já cadastrado");

    }

    public ResponseEntity<?> alterarDadosNotaFiscal(NotaFiscalAlterarRecordDTO NotaFiscalAlterarDTO){
        if(notaFiscalRepository.existsById(NotaFiscalAlterarDTO.id()) == true){
            LocalDateTime dataHoraCriada = notaFiscalRepository.findById(NotaFiscalAlterarDTO.id()).get().getCreated_at();
            NotaFiscal NotaFiscalAlterado = new NotaFiscal();
            BeanUtils.copyProperties( NotaFiscalAlterarDTO, NotaFiscalAlterado);
            LocalDateTime dataHoraAtual = LocalDateTime.now();
            NotaFiscalAlterado.setCreated_at(dataHoraCriada);
            NotaFiscalAlterado.setUpdated_at(dataHoraAtual);
            return ResponseEntity.status(HttpStatus.OK).body(notaFiscalRepository.save(NotaFiscalAlterado));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nota fiscal não encontrado!");
    }    

    public ResponseEntity<?> notaFiscalsDeletar(Long id){
        try {
            if(notaFiscalRepository.existsById(id) == true){
                notaFiscalRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Nota fiscal excluído com sucesso!");
            }
  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nota fiscal não encontrado!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Somente é possível deletar um Nota fiscal depois de deletar todos os dados que possuem vínculo com ele!");
        }
    }

    public ResponseEntity<?> notaFiscalDesativar(Long numeroNotaFiscal){
        if(notaFiscalRepository.existsByNumeroNotaFiscal(numeroNotaFiscal) == true){
            NotaFiscal notaFiscalAtivada = notaFiscalRepository.findById(numeroNotaFiscal).get();
            NotaFiscal notaFiscalDesativada = new NotaFiscal();
            BeanUtils.copyProperties( notaFiscalAtivada, notaFiscalDesativada);
            notaFiscalDesativada.setActivated(false);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Nota fiscal desativada com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nota fiscal não encontrado!");
    }
}
