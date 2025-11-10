import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form = { email: '', password: '' };
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.form).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);
        if (res.role === 'STAFF') this.router.navigate(['/dashboard']);
        if (res.role === 'MANAGER') this.router.navigate(['/manager']);
        if (res.role === 'TECHNICIAN') this.router.navigate(['/technician']);
      },
      error: () => (this.error = 'Invalid credentials')
    });
  }
}
