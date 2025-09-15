import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { authActions } from './actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class AuthEffects {
  store = inject(Store)
  authService = inject(AuthService);
  actions$ = inject(Actions)
  router = inject(Router)
  cookieService = inject(CookieService)

  login = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({data}) => {
        console.log('Введенные данные: ', data)
        return this.authService.login(data)
      }),
      map((response) => {
        console.log('Ответ от сервера: ', response)
        return authActions.saveTokensToStore({tokens: response})
      }),
      tap((response) => this.authService.saveTokensToCookieAndRedirect(response.tokens))
    )
  })

  logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        this.cookieService.deleteAll();
        return authActions.saveTokensToStore({tokens: {
          access_token: null,
          refresh_token: null
        }})
      })
    )
  })

  refreshToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.refreshToken),
      switchMap(() => {
        return this.authService.refreshAuthToken()
      }),
      map((response) => {
        console.log('Ответ от сервера: ', response)
        return authActions.saveTokensToStore({tokens: response})
      }),
      tap((response) => this.authService.saveTokensToCookieAndRedirect(response.tokens)),
      catchError((error) => {
        // this.logout();
        // this.store.dispatch(authActions.logout())
        return throwError(error);
      }),
    )
  })
}
