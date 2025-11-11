import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../state/app.state';
import * as TicketActions from '../state/ticket.actions';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager.html',
  styleUrls: ['./manager.css']
})
export class ManagerComponent implements OnInit {
  tickets$: any;
  technicians: any[] = [];

  constructor(
    private store: Store<AppState>,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tickets$ = this.store.select(state => state.tickets.tickets);
    this.store.dispatch(TicketActions.loadTickets());
    this.api.getTechnicians().subscribe(res => (this.technicians = res as any[]));
  }

  assign(ticketId: number, techId: string) {
    if (!techId) return;
    this.api.assignTicket(ticketId, +techId).subscribe(() =>
      this.store.dispatch(TicketActions.loadTickets())
    );
  }

  close(ticketId: number) {
    this.api.closeTicket(ticketId).subscribe(() =>
      this.store.dispatch(TicketActions.loadTickets())
    );
  }

  getTechnicianName(id: number): string | undefined {
    const tech = this.technicians.find(t => t.id === id);
    return tech ? tech.name : undefined;
  }

  statusClass(status: string) {
    switch (status) {
      case 'NEW':
        return 'bg-gray-300 text-gray-800';
      case 'ASSIGNED':
        return 'bg-yellow-300 text-yellow-900';
      case 'IN_PROGRESS':
        return 'bg-blue-300 text-blue-900';
      case 'COMPLETED':
        return 'bg-green-300 text-green-900';
      case 'CLOSED':
        return 'bg-red-300 text-red-900';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
