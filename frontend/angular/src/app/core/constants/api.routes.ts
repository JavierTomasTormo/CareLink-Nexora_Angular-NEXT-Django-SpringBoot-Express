import { environment } from '../../../enviroments/environment';

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${environment.apiUrl}/auth/tutor/login`,
        REGISTER: `${environment.apiUrl}/auth/tutor/register`,
        LOGOUT: `${environment.apiUrl}/auth/tutor/logout`,
        UPDATE: `${environment.apiUrl}/users/tutor`,
        VERIFY_REFRESH_TOKEN: `${environment.apiUrl}/verify-refresh-token/`,
    },
    USER_PATIENT: {
        LIST_BY_USER: (userId: number) => `${environment.apiUrl}/users/patient/?id_user=${userId}`,
    }
};
