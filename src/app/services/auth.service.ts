import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse } from '@/model/auth';
// import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseApiUrl = "https://icherniakov.ru/yt-course/auth/"
  token: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    if(!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshTokentoken')
    }

    return !!this.token
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    // private errorService: ErrorService
  ) {}

  login(payload: {username: string, password: string}) {
    const formData: FormData = new FormData()
    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(
        tap(response => this.saveTokens(response))
      )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}refresh`, { refresh_token: this.refreshToken })
      .pipe(
        tap(response => this.saveTokens(response)),
        catchError(error => {
          this.logout()
          return throwError(error)
        })
      )
  }

  saveTokens(response: TokenResponse) {
    this.token = response.access_token
    this.refreshToken = response.access_token
    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}
