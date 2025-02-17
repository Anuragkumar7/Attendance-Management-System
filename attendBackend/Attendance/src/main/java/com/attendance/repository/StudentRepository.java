package com.attendance.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByPrn(String prn);
	 Student findByEmail(String email);
}