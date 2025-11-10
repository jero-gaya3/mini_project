import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tickets.html',
  styleUrl: './my-tickets.css'
})
export class MyTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    const id = Number(localStorage.getItem('userId'));
    this.api.getMyTickets(id).subscribe(res => (this.tickets = res as any[]));
  }
}
