
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit() {
  if (this.loginForm.invalid) return;

  this.isLoading = true;
  this.errorMessage = null;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      // DEBUG: Veja no console o que o Java respondeu de fato!
      console.log('RESPOSTA DO JAVA:', res);
      
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = 'E-mail ou senha incorretos.';
      console.error(err);
    },
  });
}

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
