import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technician.html',
  styleUrls: ['./technician.css']
})
export class Technician implements OnInit {
  tickets: any[] = [];
  isBrowser = false;

  constructor(
    private api: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) this.loadTickets();
  }

  loadTickets() {
    if (!this.isBrowser) return;
    const techId = Number(localStorage.getItem('userId'));
    if (!techId) {
      console.warn('No technician ID found in localStorage.');
      return;
    }

    this.api.getTechnicianTickets(techId).subscribe({
      next: (res) => (this.tickets = res as any[]),
      error: (err) => console.error('Error fetching tickets:', err)
    });
  }

  updateStatus(id: number, status: string) {
    if (!this.isBrowser) return;
    this.api.updateStatus(id, status).subscribe({
      next: () => this.loadTickets(),
      error: (err) => console.error('Status update failed:', err)
    });
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
