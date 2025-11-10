package com.ticket.backend.controller;

import com.ticket.backend.entity.Status;
import com.ticket.backend.entity.Ticket;
import com.ticket.backend.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketRepository ticketRepository;

    // 🟢 STAFF - create a new ticket
    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        ticket.setStatus(Status.NEW);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket savedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(savedTicket);
    }

    // 🟢 MANAGER - get all tickets
    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // 🟢 STAFF - get tickets created by a specific staff member
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/staff/{id}")
    public List<Ticket> getStaffTickets(@PathVariable Long id) {
        return ticketRepository.findByCreatedBy(id);
    }

    // 🟢 TECHNICIAN - get tickets assigned to a technician
    @PreAuthorize("hasAuthority('TECHNICIAN')")
    @GetMapping("/technician/{id}")
    public List<Ticket> getTechnicianTickets(@PathVariable Long id) {
        return ticketRepository.findByAssignedTo(id);
    }

    // 🟡 MANAGER - assign a technician to a ticket
    @PreAuthorize("hasAuthority('MANAGER')")
    @PutMapping("/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id, @RequestParam Long technicianId) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setAssignedTo(technicianId);
        ticket.setStatus(Status.ASSIGNED);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    // 🔵 TECHNICIAN - update ticket status
    @PreAuthorize("hasAuthority('TECHNICIAN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(@PathVariable Long id, @RequestParam Status status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(status);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    // 🔴 MANAGER - close ticket
    @PreAuthorize("hasAuthority('MANAGER')")
    @PutMapping("/{id}/close")
    public ResponseEntity<Ticket> closeTicket(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(Status.CLOSED);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }
}
