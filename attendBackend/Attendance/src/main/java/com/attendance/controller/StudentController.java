package com.attendance.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attendance.entity.Category;
import com.attendance.entity.Student;
import com.attendance.repository.CategoryRepository;
import com.attendance.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CategoryRepository categoryRepository;

    // ✅ GET all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    // ✅ GET student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // ✅ POST: Create student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Optional<Category> category = categoryRepository.findById(student.getCategory().getId());
        if (category.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        student.setCategory(category.get());
        Student savedStudent = studentService.saveStudent(student);
        return ResponseEntity.status(201).body(savedStudent);
    }

    // ✅ PUT: Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Optional<Student> existingStudent = studentService.getStudentById(id);
        if (existingStudent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Category> category = categoryRepository.findById(student.getCategory().getId());
        if (category.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        student.setId(id);
        student.setCategory(category.get());
        Student updatedStudent = studentService.saveStudent(student);

        return ResponseEntity.ok(updatedStudent);
    }

    // ✅ DELETE student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        Optional<Student> existingStudent = studentService.getStudentById(id);
        if (existingStudent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
