import { inject } from "@angular/core";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { catchError, switchMap, throwError } from "rxjs";
// import { TokenResponse } from "@/model/auth";

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if (!token) {
    return next(request)
  }

  if(isRefreshing) {
    return refreshAndProceed(authService, request, next)
  }

  return next(addToken(request, token))
    .pipe(
      catchError(error => {
        if(error.status === 403) {
          return refreshAndProceed(authService, request, next)
        }

        return throwError(error)
      })
    )
}

const refreshAndProceed = (
  authService: AuthService,
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if(!isRefreshing) {
    isRefreshing = true

    return authService.refreshAuthToken()
      .pipe(
        switchMap((response) => {
          isRefreshing = false
          return next(addToken(request, response.access_token))
        })
      )
  }

  return next(addToken(request, authService.token!))
}

const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
