import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /** Private method to include JWT token in headers */
  private headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
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
