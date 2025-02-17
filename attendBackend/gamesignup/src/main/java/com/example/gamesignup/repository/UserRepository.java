package com.example.gamesignup.repository;

import com.example.gamesignup.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
   
}