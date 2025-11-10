import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css'
})
export class CreateTicketComponent {
  ticket: any = { priority: 'Low' };
  message = '';

  constructor(private api: ApiService) {}

  submit() {
    const userId = localStorage.getItem('userId');
    this.ticket.createdBy = Number(userId);
    this.api.createTicket(this.ticket).subscribe({
      next: () => {
        this.message = 'Ticket created successfully';
        this.ticket = { priority: 'Low' };
      },
      error: () => (this.message = 'Error creating ticket')
    });
  }
}
