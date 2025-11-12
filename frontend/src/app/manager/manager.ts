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
  allTickets: any[] = [];
  filteredTickets: any[] = [];
  technicians: any[] = [];
  selectedStatus: string = '';

  analytics = {
    total: 0,
    pending: 0,
    closed: 0
  };

  constructor(
    private store: Store<AppState>,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tickets$ = this.store.select(state => state.tickets.tickets);

    this.tickets$.subscribe((tickets: any[]) => {
      this.allTickets = tickets || [];
      this.updateAnalytics();
      this.filterTickets();
    });

    this.store.dispatch(TicketActions.loadTickets());
    this.api.getTechnicians().subscribe(res => (this.technicians = res as any[]));
  }

  /** ✅ Assign ticket */
  assign(ticketId: number, techId: string) {
    if (!techId) return;
    this.api.assignTicket(ticketId, +techId).subscribe(() =>
      this.store.dispatch(TicketActions.loadTickets())
    );
  }

  /** ✅ Close ticket */
  close(ticketId: number) {
    this.api.closeTicket(ticketId).subscribe(() =>
      this.store.dispatch(TicketActions.loadTickets())
    );
  }

  /** ✅ Get technician name */
  getTechnicianName(id: number): string | undefined {
    const tech = this.technicians.find(t => t.id === id);
    return tech ? tech.name : undefined;
  }

  /** ✅ Compute analytics summary */
  updateAnalytics() {
    this.analytics.total = this.allTickets.length;
    this.analytics.closed = this.allTickets.filter(t => t.status === 'CLOSED').length;
    this.analytics.pending = this.allTickets.filter(
      t => t.status !== 'CLOSED' && t.status !== 'COMPLETED'
    ).length;
  }

  /** ✅ Filter tickets by status */
  filterTickets() {
    if (this.selectedStatus) {
      this.filteredTickets = this.allTickets.filter(
        t => t.status === this.selectedStatus
      );
    } else {
      this.filteredTickets = [...this.allTickets];
    }
  }

  /** ✅ Status badge classes */
  statusClass(status: string) {
    switch (status) {
      case 'NEW':
        return 'bg-gray-300 text-gray-800 px-2 py-1 rounded';
      case 'ASSIGNED':
        return 'bg-yellow-300 text-yellow-900 px-2 py-1 rounded';
      case 'IN_PROGRESS':
        return 'bg-blue-300 text-blue-900 px-2 py-1 rounded';
      case 'COMPLETED':
        return 'bg-green-300 text-green-900 px-2 py-1 rounded';
      case 'CLOSED':
        return 'bg-red-300 text-red-900 px-2 py-1 rounded';
      default:
        return 'bg-gray-200 text-gray-700 px-2 py-1 rounded';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
