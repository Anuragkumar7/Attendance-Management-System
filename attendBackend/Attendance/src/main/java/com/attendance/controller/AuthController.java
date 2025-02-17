package com.attendance.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.attendance.entity.Student;
import com.attendance.service.StudentService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@SessionAttributes("student")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class AuthController {

	@Autowired
	private StudentService studentService;

	@PostMapping("/signup")
	public ResponseEntity<Map<String, Object>> signup(@RequestBody Student student) {
		System.out.println("Received User: " + student); // Debugging

		Map<String, Object> response = new HashMap<>();

		Student existingUser = studentService.findByEmail(student.getEmail());
		if (existingUser != null) {
			response.put("success", false);
			response.put("message", "User already exists");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}

		if (student.getPrn() == null || student.getPrn().isEmpty()) {
			response.put("success", false);
			response.put("message", "PRN is required");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}

		studentService.saveStudent(student);
		response.put("success", true);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Student student, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		Student existingUser = studentService.findByEmail(student.getEmail());

		if (existingUser != null && existingUser.getPassword().equals(student.getPassword())) {
			session.setAttribute("student", existingUser);
			response.put("success", true);
			response.put("role", existingUser.getRole());
			response.put("studentId", existingUser.getId());
			response.put("userName", existingUser.getName());
			return ResponseEntity.ok(response);
		}

		response.put("success", false);
		response.put("message", "Invalid credentials");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@GetMapping("/me")
	public ResponseEntity<Map<String, Object>> getCurrentUser(HttpSession session) {
		Map<String, Object> response = new HashMap<>();

		Student user = (Student) session.getAttribute("student");
		if (user == null) {
			response.put("success", false);
			response.put("message", "Not logged in");
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}

		response.put("success", true);
		response.put("email", user.getEmail());
		response.put("role", user.getRole());

		return ResponseEntity.ok(response);
	}

	@PostMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(HttpSession session, HttpServletResponse response) {
		// Invalidate session
		session.invalidate();

		// Clear cookies
		ResponseCookie cookie = ResponseCookie.from("JSESSIONID", "").path("/").httpOnly(true).secure(true).maxAge(0)
				.build();

		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

		// Response payload
		Map<String, Object> responseBody = new HashMap<>();
		responseBody.put("success", true);
		responseBody.put("message", "Logged out successfully");

		return ResponseEntity.ok(responseBody);
	}
}