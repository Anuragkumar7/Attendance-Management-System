package com.attendance.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role;

    @Column(unique = true, nullable = false) 
    private String prn;

    @OneToOne
    @JoinColumn(name = "prn", referencedColumnName = "prn", insertable = false, updatable = false) 
    private Student student;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}
