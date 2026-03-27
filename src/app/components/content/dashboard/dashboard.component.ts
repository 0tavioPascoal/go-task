import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { AuthService } from '../../../services/auth/auth-service';


@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    HeaderComponent,
    MainContentComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private readonly _AuthService = inject(AuthService)

  ngOnInit() {
    this._AuthService.getUserInfo().subscribe({
      next: (user) => console.log('Usuário carregado:', user),
      error: () => console.error('Sessão inválida ou expirada')
    });
  }
 }

