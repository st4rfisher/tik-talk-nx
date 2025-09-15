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
import { selectAccess_token, selectRefresh_token } from '../store';

// import { TokenResponse } from "@/model/auth";

//переменная, отвечающая за то, обновляется ли в данный момент токен
let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService),
    store = inject(Store),
    // token = authService.token
    token = store.selectSignal(selectAccess_token)

  //пропуск запроса если он идет на dadata.ru
  if(request.url.includes('dadata.ru')) return next(request)

  //если токена нет, то пропустить запрос
  if (!token()) return next(request);

  //если выполняется обновление токена, то прокидываем запрос дальше
  if (isRefreshing$.value) return refreshAndProceed(authService, request, next);

  //добавление токена в каждый запрос
  //и его обновление в случае устаревания
  return next(addToken(request, token()!)).pipe(

    catchError((error) => {
      if (error.status === 403) {
        //обновление токена
        return refreshAndProceed(authService, request, next);
      }

      return throwError(error);
    })
  );
};

//обновление токена и отдача запроса
const refreshAndProceed = (
  authService: AuthService,
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const store = inject(Store),
    token = store.selectSignal(selectAccess_token)

  //выполнить обновление токена,
  //если он не выполняется
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return store.select(selectRefresh_token).pipe(
      switchMap((refreshToken) => {
        console.log('Токен при его обновлении: ', refreshToken)
        return next(addToken(request, refreshToken!)).pipe(
          tap(() => isRefreshing$.next(false))
        );
      })
    )
  }

  // if (!isRefreshing$.value) {
  //   isRefreshing$.next(true);

  //   return authService.refreshAuthToken().pipe(
  //     switchMap((response) => {
  //       return next(addToken(request, response.access_token!)).pipe(
  //         tap(() => isRefreshing$.next(false))
  //       );
  //     })
  //   );
  // }

  //если запрос на обновление токена, то его пропускаем без ожиданий
  if (request.url.includes('refresh')) {
    console.log('Запрос с обновлением токена: ', token())
    return next(addToken(request, token()!));
  }

  //все оставшиеся запросы ставим в режим ожидания
  //до завершения обновления токена, после чего
  //отправляем их на сервер с уже обновленным токеном
  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap(() => {
      console.log('Запрос с ожиданием: ', token())
      return next(addToken(request, token()!));
    })
  );
};

//Добавление заголовка с токеном в запрос
const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
