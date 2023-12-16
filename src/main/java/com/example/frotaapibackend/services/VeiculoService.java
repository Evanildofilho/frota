package com.example.frotaapibackend.services;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.frotaapibackend.dtos.VeiculoRecordDto;
import com.example.frotaapibackend.models.NotaFiscal;
import com.example.frotaapibackend.models.Veiculo;
import com.example.frotaapibackend.repositories.VeiculoRepository;

@Service
public class VeiculoService {

    @Autowired
    VeiculoRepository veiculoRepository;

    public ResponseEntity<?> cadastrarVeiculo(VeiculoRecordDto veiculoRecordDto){

        if(veiculoRepository.existsByPlaca(veiculoRecordDto.placa()) == true){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Essa placa já está cadastrada no sistema!");
        }

        var veiculo = new Veiculo();
        BeanUtils.copyProperties( veiculoRecordDto, veiculo);
        veiculo.setCreated_at(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoRepository.save(veiculo));
    }

    public ResponseEntity<?> veiculosCadastrados(){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoRepository.findAll());
    }

    public ResponseEntity<?> veiculoPorPlaca(String placa){

        if(veiculoRepository.existsByPlaca(placa) == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veículo não encontrado!");
        }

        return ResponseEntity.status(HttpStatus.OK).body(veiculoRepository.findByPlaca(placa));
    }

    public ResponseEntity<?> alterarDadosVeiculo(VeiculoRecordDto veiculoRecordDto){

        if(veiculoRepository.existsByPlaca(veiculoRecordDto.placa()) == true){
            Veiculo veiculo = new Veiculo();
            LocalDateTime created_at_temp = veiculoRepository.findByPlaca(veiculoRecordDto.placa()).getCreated_at();
            BeanUtils.copyProperties( veiculoRecordDto, veiculo);
            veiculo.setIdVeiculo(veiculoRepository.findByPlaca(veiculo.getPlaca()).getIdVeiculo());
            veiculo.setCreated_at(created_at_temp);
            veiculo.setUpdated_at(LocalDateTime.now());
            return ResponseEntity.status(HttpStatus.OK).body(veiculoRepository.save(veiculo));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veículo não encontrado!");
    }

    public ResponseEntity<?> deletarVeiculo(String placa){
        try {
            if(veiculoRepository.existsByPlaca(placa) == true){
                veiculoRepository.delete(veiculoRepository.findByPlaca(placa));

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Veículo excluído com sucesso!");
        }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veículo não encontrado!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro das dependencias");
        }
    }

    public ResponseEntity<?> desativarVeiculo(String placa){
        if(veiculoRepository.existsByPlaca(placa) == true){
            Veiculo veiculoAtivado = veiculoRepository.findByPlaca(placa);
            Veiculo veiculoDesativado = new Veiculo();
            BeanUtils.copyProperties( veiculoAtivado, veiculoDesativado);
            veiculoDesativado.setActivated(false);
            veiculoRepository.save(veiculoDesativado);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Veiculo desativada com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veiculo não encontrado!");
    }

}
