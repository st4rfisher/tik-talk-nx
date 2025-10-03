import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse } from './auth.interface';
// import { ErrorService } from './error.service';
// import { BASE_API_URL } from 'global/variables';
import { environment } from '@tt/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const formData: FormData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/token`, formData)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  logout() {
    return this.http.post<string>(`${environment.apiUrl}/auth/logout`, {})
      .pipe(tap(() => this.deleteTokens()));
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((response) => this.saveTokens(response)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  saveTokens(response: TokenResponse) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

  deleteTokens() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
  }
}
