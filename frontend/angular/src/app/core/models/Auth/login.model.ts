import { User } from '../../Users/user.model';

export interface LoginResponse {
    status: string;
    user: User;
    accessToken: string;
    role: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}