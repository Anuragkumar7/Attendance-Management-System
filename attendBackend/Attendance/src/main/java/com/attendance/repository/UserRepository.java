package com.attendance.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.entity.User;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}