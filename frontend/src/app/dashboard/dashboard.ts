import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTicketComponent } from '../create-ticket/create-ticket';
import { MyTicketsComponent } from '../my-tickets/my-tickets';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CreateTicketComponent, MyTicketsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  current = 'create';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
