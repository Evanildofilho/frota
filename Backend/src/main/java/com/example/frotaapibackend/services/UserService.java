package com.example.frotaapibackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.frotaapibackend.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;


    public ResponseEntity<?> usuariosCadastrados(){
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }

    public ResponseEntity<?> deletarUsuario(String id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuário deletado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
    }
}
