import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technician.html',
  styleUrl: './technician.css'
})
export class Technician implements OnInit {
  tickets: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    const techId = Number(localStorage.getItem('userId'));
    this.api.getTechnicianTickets(techId).subscribe(res => (this.tickets = res as any[]));
  }

  updateStatus(id: number, status: string) {
    this.api.updateStatus(id, status).subscribe(() => {
      const techId = Number(localStorage.getItem('userId'));
      this.api.getTechnicianTickets(techId).subscribe(res => (this.tickets = res as any[]));
    });
  }
}
