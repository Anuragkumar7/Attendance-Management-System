package com.example.gamesignup.controller;

import com.example.gamesignup.entity.User;
import com.example.gamesignup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/me")
    public User getUser(@RequestParam String username) {
        return userService.findByUsername(username);
    }
}