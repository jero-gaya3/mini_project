import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { ManagerComponent } from './manager/manager';
import { Technician } from './technician/technician';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'technician', component: Technician },

];
