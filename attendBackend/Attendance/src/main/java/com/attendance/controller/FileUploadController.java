package com.attendance.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Create the directory if it doesn't exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // Save the file locally
        String originalFilename = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + originalFilename);
        Files.write(filePath, file.getBytes());

        // Build the file download URL
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/" + UPLOAD_DIR)
                .path(originalFilename)
                .toUriString();

        return fileDownloadUri;
    }
}