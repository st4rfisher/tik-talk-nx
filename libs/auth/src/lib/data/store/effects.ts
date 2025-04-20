import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AuthService } from '@tt/auth';
import { loginQueryActions, loginResponseActions } from './actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginEffects {
  router = inject(Router)
  authService = inject(AuthService);
  actions$ = inject(Actions)

  login = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginQueryActions.login),
      switchMap(({data}) => {
        console.log(data)
        return this.authService.login(data)
      }),
      map(response => {
        console.log(response)

        this.router.navigate(['']);

        return loginResponseActions.setTokenToStore({token: response})
      })
    )
  })

  refreshToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginQueryActions.refreshToken),
      switchMap(() => {
        return this.authService.refreshAuthToken()
      }),
      map(response => {
        console.log(response)

        return loginResponseActions.setTokenToStore({token: response})
      })
    )
  })

  // setTokenToCookie = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loginResponseActions.setTokenToCookie),
  //     switchMap(() => {
  //       return this.authService.refreshAuthToken()
  //     }),
  //     map(response => {
  //       console.log(response)

  //       return loginResponseActions.setTokenToStore({token: response})
  //     })
  //   )
  // })
}
