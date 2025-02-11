import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

import { API_ROUTES } from '../../constants/api.routes';
import { LoginResponse, LoginRequest } from '../../models/Auth/login.model';
import { RegisterResponse, RegisterRequest } from '../../models/Auth/register.model';
import { User } from '../../models/Users/user.model';




@Injectable({
    providedIn: 'root'
})
    export class UserService {
        constructor(
            private http: HttpClient,
            private tokenService: TokenService
        ) {}
    
        login(credentials: LoginRequest): Observable<LoginResponse> {
            return this.http.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, credentials);
        }
    
        register(userData: RegisterRequest): Observable<RegisterResponse> {
            return this.http.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, userData);
        }
    
        logout(): Observable<any> {
            return this.http.post(API_ROUTES.AUTH.LOGOUT, {});
        }

        updateUser(userId: number, userData: Partial<User>): Observable<User> {
            return this.http.put<User>(`${API_ROUTES.AUTH.UPDATE}/${userId}/`, userData);
        }
    }