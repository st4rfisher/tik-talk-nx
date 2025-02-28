import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const accessGuard: CanActivateFn = () => {
  const isLoggedIn: boolean = inject(AuthService).isAuth;

  if (isLoggedIn) return true;
  return inject(Router).createUrlTree(['/login']);
};
