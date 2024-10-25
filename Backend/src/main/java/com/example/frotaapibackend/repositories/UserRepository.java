package com.example.frotaapibackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.frotaapibackend.models.User;

public interface UserRepository extends JpaRepository<User, String>{
    UserDetails findByLogin(String login);
}
