import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token/token.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login'], { 
    queryParams: { returnUrl: state.url }
  });
  return false;
};