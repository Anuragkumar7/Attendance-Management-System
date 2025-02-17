package com.attendance.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.attendance.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
	 List<Attendance> findByDate(LocalDate date);
	    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
	    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId")
	    List<Attendance> findByStudentId(@Param("studentId") Long studentId);
	    
}
	