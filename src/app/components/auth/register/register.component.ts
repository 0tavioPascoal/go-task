import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import type { IUserRequest } from '../../../interfaces/user/user-request-interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}`;

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;
  isLoading: boolean = false;

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.http
      .post<IUserRequest>(`${this.API_URL}/auth/register`, this.registerForm.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Usuário criado com sucesso:', res);
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' },
          });
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 409 || err.status === 400) {
            this.errorMessage = 'Este e-mail já está em uso ou os dados são inválidos.';
          } else {
            this.errorMessage = 'Erro ao conectar com o servidor. Tente novamente.';
          }
          console.error('Erro no registro:', err);
        },
      });
  }
}
