import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAuthToken();

  if (token && !authService.tokenHasExpired()) {
    router.navigateByUrl('/dashboard');

    return false;
  }

  return true;
};
