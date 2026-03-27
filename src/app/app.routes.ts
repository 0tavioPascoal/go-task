import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/content/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
