package com.example.frotaapibackend.services;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.frotaapibackend.dtos.AbastecimentoAlterarRecordDto;
import com.example.frotaapibackend.dtos.AbastecimentoRecordDto;
import com.example.frotaapibackend.models.Abastecimento;
import com.example.frotaapibackend.models.Veiculo;
import com.example.frotaapibackend.repositories.AbastecimentoRepository;
import com.example.frotaapibackend.repositories.VeiculoRepository;

@Service
public class AbastecimentoService {
    
    @Autowired
    AbastecimentoRepository abastecimentoRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    public ResponseEntity<?> cadastroAbastecimento(AbastecimentoRecordDto abastecimentoRecordDto){
        if(veiculoRepository.existsByPlaca(abastecimentoRecordDto.placa())){
            Veiculo veiculo = veiculoRepository.findByPlaca(abastecimentoRecordDto.placa());
            Abastecimento abastecimento = new Abastecimento();
            BeanUtils.copyProperties(abastecimentoRecordDto, abastecimento);
            abastecimento.setCreated_at(LocalDateTime.now());
            abastecimento.setVeiculo(veiculo);
            return ResponseEntity.status(HttpStatus.CREATED).body(abastecimentoRepository.save(abastecimento));
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veículo não encontrado!");
    }

    public ResponseEntity<?> abastecimentosCadastrados(){
        return ResponseEntity.status(HttpStatus.OK).body(abastecimentoRepository.findAll());
    }

    public ResponseEntity<?> abastecimentosPorPlaca(String placa){
        if(veiculoRepository.existsByPlaca(placa)){
            Veiculo veiculo = veiculoRepository.findByPlaca(placa);
            return ResponseEntity.status(HttpStatus.OK).body(abastecimentoRepository.findAllByVeiculo(veiculo));
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veículo não encontrado!");
    }

    public ResponseEntity<?> abastecimentoPorId(Long id){
        if(abastecimentoRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.OK).body(abastecimentoRepository.findByidAbasteciemento(id));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Abastecimento não encontrado!");
    }

    public ResponseEntity<?> alterarAbastecimento(AbastecimentoAlterarRecordDto abastecimentoAlterarRecordDto){
        if(abastecimentoRepository.existsById(abastecimentoAlterarRecordDto.idAbasteciemento())){
            Abastecimento abastecimento = abastecimentoRepository.findByidAbasteciemento(abastecimentoAlterarRecordDto.idAbasteciemento());
            LocalDateTime created_at_temp = abastecimento.getCreated_at();            
            BeanUtils.copyProperties(abastecimentoAlterarRecordDto, abastecimento);
            abastecimento.setCreated_at(created_at_temp);
            abastecimento.setUpdated_at(LocalDateTime.now());
            return ResponseEntity.status(HttpStatus.OK).body(abastecimentoRepository.save(abastecimento));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Abastecimento não encontrado!");
    }

    public ResponseEntity<?> deletarPorId(Long id){
        if(abastecimentoRepository.existsById(id)){
            abastecimentoRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Abastecimento excluído com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Abastecimento não encontrado!");
    }

}
