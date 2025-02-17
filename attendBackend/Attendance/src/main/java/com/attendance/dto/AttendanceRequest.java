package com.attendance.dto;

import java.time.LocalDate;

public class AttendanceRequest {
    private Long studentId;
    private String status;
    private LocalDate date;

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
