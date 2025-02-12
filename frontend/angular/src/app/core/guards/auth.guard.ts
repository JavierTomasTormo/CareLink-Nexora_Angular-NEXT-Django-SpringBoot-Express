import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token/token.service';
import { API_ROUTES } from '../constants/api.routes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const http = inject(HttpClient);

  if (tokenService.isAuthenticated()) {
    const refreshToken = tokenService.getRefreshToken();
    return http.post<{ valid: boolean }>(API_ROUTES.AUTH.VERIFY_REFRESH_TOKEN, { refreshToken }).pipe(
      map(response => {
        if (response.valid) {
          return true;
        } else {
          router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }

  router.navigate(['/auth/login'], { 
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// import { inject } from '@angular/core';
// import { Router, CanActivateFn } from '@angular/router';
// import { TokenService } from '../services/token/token.service';

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const tokenService = inject(TokenService);

//   if (tokenService.isAuthenticated()) {
//     return true;
//   }

//   router.navigate(['/auth/login'], { 
//     queryParams: { returnUrl: state.url }
//   });
//   return false;
// };