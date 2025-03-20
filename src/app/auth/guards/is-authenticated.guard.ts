import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const token = authService.getAuthToken();

  if (token && !authService.tokenHasExpired()) return true;

  authService.logout();

  return false;
};
