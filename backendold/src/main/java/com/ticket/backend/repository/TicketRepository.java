package com.ticket.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticket.backend.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreatedBy(Long id);
    List<Ticket> findByAssignedTo(Long id);
}