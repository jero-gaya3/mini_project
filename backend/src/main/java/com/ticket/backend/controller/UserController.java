package com.ticket.backend.controller;

import com.ticket.backend.entity.Role;
import com.ticket.backend.entity.User;
import com.ticket.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Only MANAGER can create new users
    @PreAuthorize("hasAuthority('MANAGER')")
    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable Role role) {
        return userRepository.findByRole(role);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = existingUserOpt.get();
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setRole(updatedUser.getRole());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        User savedUser = userRepository.save(existingUser);
        return ResponseEntity.ok(savedUser);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
} 
