package com.ticket.backend.service;

import com.ticket.backend.entity.Status;
import com.ticket.backend.entity.Ticket;
import com.ticket.backend.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus(Status.NEW);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getStaffTickets(Long staffId) {
        return ticketRepository.findByCreatedBy(staffId);
    }

    public List<Ticket> getTechnicianTickets(Long techId) {
        return ticketRepository.findByAssignedTo(techId);
    }

    public Ticket assignTicket(Long ticketId, Long technicianId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        ticket.setAssignedTo(technicianId);
        ticket.setStatus(Status.ASSIGNED);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicketStatus(Long ticketId, Status status) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        ticket.setStatus(status);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    public Ticket closeTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        ticket.setStatus(Status.CLOSED);
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }
}
