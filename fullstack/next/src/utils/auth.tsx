import { SHARED_ROUTES } from '@/store/Constants';

export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('accessToken') 
        && !!localStorage.getItem('refreshToken') 
        && !!localStorage.getItem('UserInfo');
    }
     return false;
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    window.location.href = SHARED_ROUTES.ANGULAR.AUTH.LOGOUT;
};