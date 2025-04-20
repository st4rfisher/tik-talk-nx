import { inject } from '@angular/core';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { loginQueryActions, loginResponseActions, selectAccessToken, selectRefreshToken } from '../store';
// import { TokenResponse } from "@/model/auth";

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {

  // const authService = inject(AuthService);
  // const token = authService.token;
  const store = inject(Store)
  const token = store.selectSignal(selectAccessToken)

  //если токена нет, то пропустить запрос
  if (!token()) return next(request);

  //если выполняется обновление токена, то прокидываем запрос дальше
  if (isRefreshing$.value) return refreshAndProceed(store, request, next);
  // if (isRefreshing$.value) return refreshAndProceed(authService, request, next);

  //добавление токена в каждый запрос
  //и его обновление в случае устаревания
  return next(addToken(request, token()!)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        console.log('error', error.status)
        //обновление токена
        return refreshAndProceed(store, request, next);
      }

      return throwError(error);
    })
  );
};

//обновление токена и отдача запроса
const refreshAndProceed = (
  store: Store,
  // authService: AuthService,
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const token = store.selectSignal(selectAccessToken)

  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    store.dispatch(loginQueryActions.refreshToken())
    return store.select(selectRefreshToken).pipe(
      switchMap((access_token) => {
        console.log(access_token)
        return next(addToken(request, access_token!)).pipe(
          tap(() => isRefreshing$.next(false))
        );
      })
    )
    // return authService.refreshAuthToken().pipe(
    //   switchMap((response) => {
    //     return next(addToken(request, response.access_token)).pipe(
    //       tap(() => isRefreshing$.next(false))
    //     );
    //   })
    // );
  }

  if (request.url.includes('refresh'))
    // return next(addToken(request, authService.token!));
    return next(addToken(request, token()!));

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap(() => {
      return next(addToken(request, token()!));
      // return next(addToken(request, authService.token!));
    })
  );

  // return next(addToken(request, authService.token!))
};

//Добавление заголовка с токеном в запрос
const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
