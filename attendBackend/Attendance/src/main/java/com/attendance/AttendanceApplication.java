package com.attendance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.attendance.entity.Category;
import com.attendance.repository.CategoryRepository;

@SpringBootApplication
public class AttendanceApplication implements CommandLineRunner {

	@Autowired
	private CategoryRepository categoryRepository;

	public static void main(String[] args) {
		SpringApplication.run(AttendanceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Initialize categories
		if (categoryRepository.count() == 0) {
			Category pgDac = new Category();
			pgDac.setName("PG-DAC");
			categoryRepository.save(pgDac);

			Category pgDbda = new Category();
			pgDbda.setName("PG-DBDA");
			categoryRepository.save(pgDbda);
		}
	}

}
