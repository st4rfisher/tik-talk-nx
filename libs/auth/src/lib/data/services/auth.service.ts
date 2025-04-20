import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse, loginQueryActions, loginResponseActions, selectAccessToken, selectRefreshToken } from '@tt/auth';
// import { ErrorService } from './error.service';
import { BASE_API_URL } from 'global/variables';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  store = inject(Store)
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  // token: string | null = null;
  // refreshToken: string | null = null;
  token = this.store.selectSignal(selectAccessToken)
  refresh_token = this.store.selectSignal(selectRefreshToken)

  get isAuth() {
    if (!this.token()) {
      console.log(this.token())
      this.store.dispatch(loginResponseActions.setTokenToStore({ token: {
        access_token: this.cookieService.get('token'),
        refresh_token: this.cookieService.get('refreshToken')
      }}))
      // this.token = this.cookieService.get('token');
      // this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token();
  }

  login(payload: { username: string; password: string }) {
    const formData: FormData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post<TokenResponse>(`${BASE_API_URL}/auth/token`, formData)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  logout() {
    this.cookieService.deleteAll();
    // this.token = null;
    // this.refreshToken = null;
    this.store.dispatch(loginResponseActions.setTokenToStore({ token: {
      access_token: null,
      refresh_token: null
    }}))
    this.router.navigate(['/login']);
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${BASE_API_URL}/auth/refresh`, {
        refresh_token: this.refresh_token,
      })
      .pipe(
        tap((response) => this.saveTokens(response)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  // saveTokens(response: TokenResponse) {
  //   this.token = response.access_token;
  //   this.refreshToken = response.refresh_token;
  //   this.cookieService.set('token', this.token);
  //   this.cookieService.set('refreshToken', this.refreshToken);
  // }

  saveTokens(response: TokenResponse) {
    console.log(response)
    this.store.dispatch(loginResponseActions.setTokenToStore({token: {
      access_token: response.access_token,
      refresh_token: response.refresh_token
    }}))
    // this.token = response.access_token;
    // this.refreshToken = response.refresh_token;
    this.cookieService.set('token', this.token() as string);
    this.cookieService.set('refreshToken', this.refresh_token() as string);
  }
}
