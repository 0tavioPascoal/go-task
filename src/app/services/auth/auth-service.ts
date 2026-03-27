import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, throwError, Observable } from 'rxjs';
import type { IUser } from '../../interfaces/user/user-inteface';
import type { ILoginResponse } from '../../interfaces/auth/login-response-interface';
import type { IRefreshToken } from '../../interfaces/auth/refresh-token-interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = `${environment.apiUrl}`;

  currentUser = signal<IUser | null>(null);

  constructor() {
    this.initializeUser();
  }

  private initializeUser(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        this.clearSession();
      }
    }
  }

  setCurrentUser(user: IUser): void {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/me`, { withCredentials: true }).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.clearSession();
        }
        return throwError(() => err);
      })
    );
  }

  login(credentials: any): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.API_URL}/auth/login`, credentials, { withCredentials: true })
      .pipe(
        tap((res) => {
          localStorage.setItem('user_logged', 'true');
          // Note: Se o seu login ainda não retorna o 'user', 
          // você chamará o getUserInfo() logo após o login no componente.
          if (res.user) {
            this.setCurrentUser(res.user);
          }
        })
      );
  }

  refreshToken(): Observable<IRefreshToken> {
    return this.http.post<IRefreshToken>(`${this.API_URL}/auth/refresh`, {}, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.clearSession()),
      catchError((err) => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  private clearSession(): void {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser() && localStorage.getItem('user_logged') === 'true';
  }
}