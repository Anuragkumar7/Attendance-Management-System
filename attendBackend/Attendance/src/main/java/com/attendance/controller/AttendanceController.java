package com.attendance.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attendance.dto.AttendanceRequest;
import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.StudentRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Fetch attendance for a specific date
    @GetMapping
    public List<Attendance> getAttendanceByDate(@RequestParam("date") LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    @PostMapping
    public ResponseEntity<String> submitAttendance(@RequestBody List<AttendanceRequest> attendanceList) {
        System.out.println("Received attendance data: " + attendanceList); // Debugging log

        for (AttendanceRequest request : attendanceList) {
            // Check if student exists
            Optional<Student> studentOpt = studentRepository.findById(request.getStudentId());
            if (studentOpt.isEmpty()) {
                System.out.println("Error: Student ID " + request.getStudentId() + " not found!"); // Debugging log
                return ResponseEntity.badRequest().body("Error: Student ID " + request.getStudentId() + " not found!");
            }

            Student student = studentOpt.get();

            // Check if attendance already exists
            Optional<Attendance> existingRecord = attendanceRepository.findByStudentIdAndDate(student.getId(), request.getDate());
            if (existingRecord.isPresent()) {
                System.out.println("Duplicate attendance for student " + student.getId() + " on " + request.getDate()); // Debugging log
                return ResponseEntity.badRequest().body("Attendance for student " + student.getId() + " on " + request.getDate() + " already exists!");
            }

            // Save new attendance record
            Attendance attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setStatus(request.getStatus());
            attendance.setDate(request.getDate());
            attendanceRepository.save(attendance);
        }
      

        System.out.println("Attendance saved successfully!"); // Debugging log
        return ResponseEntity.ok("Attendance saved successfully!");
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getAttendanceForStudent(@PathVariable Long studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }

        Student student = studentOpt.get();
        List<Attendance> attendanceRecords = attendanceRepository.findByStudentId(studentId);

        Map<String, Object> response = new HashMap<>();
        response.put("student", student);
        response.put("attendance", attendanceRecords);

        return ResponseEntity.ok(response);
    }

}
