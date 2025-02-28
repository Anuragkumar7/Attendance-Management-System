package com.attendance.entity;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String prn;
    
    private String gender;
    private String fatherName;
    private String email;
    private String dob;
    private String resume;
    private String image;
    private String role;
    private String password;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ElementCollection
    @CollectionTable(name = "student_attendance", joinColumns = @JoinColumn(name = "student_id"))
    @MapKeyColumn(name = "date")
    @Column(name = "status")
    private Map<String, String> attendance = new HashMap<>();

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Map<String, String> getAttendance() { return attendance; }
    public void setAttendance(Map<String, String> attendance) { this.attendance = attendance; }

    public String getResume() { return resume; }
    public void setResume(String resume) { this.resume = resume; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}