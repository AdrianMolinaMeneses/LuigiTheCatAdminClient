import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtDecodeService } from './jwt-decode.service';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = `${environment.BACK_END_HOST}/auth`;
  private http = inject(HttpClient);
  private router = inject(Router);
  private jwtDecodeService = inject(JwtDecodeService);

  constructor() {}

  private setAuthentication(user: User, token: string): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem(
      'expires',
      JSON.stringify(this.jwtDecodeService.decodeToken(token)['exp'])
    );

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigateByUrl('/auth/login');
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem('token');

    return token ? token : null;
  }

  getStorageUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : '';
  }

  tokenHasExpired() {
    var convertDate = Number(localStorage.getItem('expires')) * 1000;
    var expireDate = new Date(convertDate);
    var currentDate = new Date();

    return currentDate > expireDate;
  }
}
