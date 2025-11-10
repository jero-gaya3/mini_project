import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as TicketActions from '../state/ticket.actions';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager.html',
  styleUrls: ['./manager.css']
})
export class ManagerComponent implements OnInit {
  tickets$: any;
  technicians: any[] = [];

  constructor(private store: Store<AppState>, private api: ApiService) {}

  ngOnInit() {
    this.tickets$ = this.store.select(state => state.tickets.tickets);
    this.store.dispatch(TicketActions.loadTickets());
    this.api.getTechnicians().subscribe(res => (this.technicians = res as any[]));
  }

  assign(ticketId: number, techId: string) {
    if (!techId) return;
    this.api.assignTicket(ticketId, +techId).subscribe(() => this.store.dispatch(TicketActions.loadTickets()));
  }

  close(ticketId: number) {
    this.api.closeTicket(ticketId).subscribe(() => this.store.dispatch(TicketActions.loadTickets()));
  }
}
