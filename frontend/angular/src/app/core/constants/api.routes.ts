import { environment } from '../../../enviroments/environment';

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${environment.apiUrl}/auth/tutor/login`,
        REGISTER: `${environment.apiUrl}/auth/tutor/register`,
        LOGOUT: `${environment.apiUrl}/auth/tutor/logout`,
        UPDATE: `${environment.apiUrl}/users/tutor`,
    }
};
