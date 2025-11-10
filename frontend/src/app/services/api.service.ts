import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8080/api';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Private method to include JWT token in headers safely (SSR compatible) */
  private headers() {
    let headers = new HttpHeaders();

    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return { headers };
  }

  /** ===== AUTH ===== */
  login(data: any): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, data);
  }

  /** ===== STAFF ===== */
  createTicket(data: any): Observable<any> {
    return this.http.post(`${this.base}/tickets`, data, this.headers());
  }

  getMyTickets(staffId: number): Observable<any> {
    return this.http.get(`${this.base}/tickets/staff/${staffId}`, this.headers());
  }

  /** ===== MANAGER ===== */
  getAllTickets(): Observable<any> {
    return this.http.get(`${this.base}/tickets`, this.headers());
  }

  getTechnicians(): Observable<any> {
    return this.http.get(`${this.base}/users/role/TECHNICIAN`, this.headers());
  }

  assignTicket(id: number, techId: number): Observable<any> {
    return this.http.put(`${this.base}/tickets/${id}/assign`, { assignedTo: techId }, this.headers());
  }

  closeTicket(id: number): Observable<any> {
    return this.http.put(`${this.base}/tickets/${id}/close`, {}, this.headers());
  }

  /** ===== TECHNICIAN ===== */
  getTechnicianTickets(id: number): Observable<any> {
    return this.http.get(`${this.base}/tickets/technician/${id}`, this.headers());
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.base}/tickets/${id}/status`, { status }, this.headers());
  }
}
