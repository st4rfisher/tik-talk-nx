import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse, loginData } from './auth.interface';
// import { ErrorService } from './error.service';
import { BASE_API_URL } from 'global/variables';
import { Store } from '@ngrx/store';
import { authActions, selectAccess_token, selectRefresh_token } from '../store';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  store = inject(Store)
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  // tokenFromStore = this.store.select(selectAccess_token)
  // refreshTokenFromStore = this.store.select(selectRefresh_token)
  token = signal<string | null>(null)
  refreshToken = signal<string | null>(null)
  // state$ = this.store.select(state => state);

  constructor() {
    this.store.select(selectAccess_token).subscribe(token => {
      console.log(token)
      this.token.set(token!)
    })

    this.store.select(selectRefresh_token).subscribe(refreshToken => {
      console.log(refreshToken)
      this.refreshToken.set(refreshToken!)
    })

    // this.store.subscribe(state => {
    //   console.log('Current Store State: ', state)
    // })
  }

  get isAuth() {
    if (!this.token()) {
      this.token.set(this.cookieService.get('token'))
      this.refreshToken.set(this.cookieService.get('refreshToken'))
      this.store.dispatch(authActions.saveTokensToStore({tokens: {
        access_token: this.token(),
        refresh_token: this.refreshToken()
      }}))

      // console.log(this.token())
    }

    return !!this.token();
  }

  login(payload: loginData) {
    const formData: FormData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post<TokenResponse>(`${BASE_API_URL}/auth/token`, formData)
  }

  logout() {
    this.cookieService.deleteAll();
    this.store.dispatch(authActions.saveTokensToStore({tokens: {
      access_token: null,
      refresh_token: null
    }}))
    // // this.token = null;
    // // this.refreshToken = null;
    // this.router.navigate(['/login']);
  }

  // refreshAuthToken2(refreshToken: string) {
  //   return this.http.post<TokenResponse>(`${BASE_API_URL}/auth/refresh`, {
  //     refresh_token: refreshToken,
  //   });
  // }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${BASE_API_URL}/auth/refresh`, {
      refresh_token: this.refreshToken(),
    })
    // .pipe(
    //   tap((response) => this.saveTokens(response)),
    //   catchError((error) => {
    //     this.logout();
    //     return throwError(error);
    //   })
    // );
  }

  saveTokensToCookieAndRedirect(tokens: TokenResponse) {
    this.cookieService.set('token', tokens.access_token!)
    this.cookieService.set('refreshToken', tokens.refresh_token!)
    this.router.navigate([''])
  }
}
