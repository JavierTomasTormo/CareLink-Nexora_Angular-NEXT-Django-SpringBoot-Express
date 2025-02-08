import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (isPublicRoute(req.url)) {
        return next(req);
    }

    const token = tokenService.getAccessToken();
    if (token) {
        req = addToken(req, token);
    }

    return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    tokenService.clearAll();
                    router.navigate(['/auth/login']);
                }
                return throwError(() => error);
            })
        );
}; 

const addToken = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
};

const isPublicRoute = (url: string): boolean => {
    const publicRoutes = ['/auth/login', '/auth/register'];
    return publicRoutes.some(route => url.includes(route));
};

// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { TokenService } from '../../services/token/token.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(
//         private tokenService: TokenService,
//         private router: Router
//     ) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (this.isPublicRoute(req.url)) {
//             return next.handle(req);
//         }

//         const token = this.tokenService.getAccessToken();
//         if (token) {
//             req = this.addToken(req, token);
//         }

//         return next.handle(req).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 if (error.status === 401) {
//                     this.tokenService.clearTokens();
//                     this.router.navigate(['/auth/login']);
//                 }
//                 return throwError(() => error);
//             })
//         );
//     }

//     private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
//         return request.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     }

//     private isPublicRoute(url: string): boolean {
//         const publicRoutes = [
//             '/auth/login',
//             '/auth/register'
//         ];
//         return publicRoutes.some(route => url.includes(route));
//     }
// }