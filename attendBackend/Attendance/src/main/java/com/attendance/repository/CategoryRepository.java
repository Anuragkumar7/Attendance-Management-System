package com.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}