package com.ticket.backend.repository;

import com.ticket.backend.entity.Role;
import com.ticket.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 🔹 Used for authentication
    Optional<User> findByEmail(String email);

    // 🔹 Used by manager to fetch all technicians or other roles
    List<User> findByRole(Role role);
}
