import { SHARED_ROUTES } from '@/store/Constants';
import Cookies from 'js-cookie';


export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('accessToken') 
            && !!localStorage.getItem('refreshToken') 
            && !!localStorage.getItem('UserInfo')
            && !!Cookies.get('accessToken')
            && !!Cookies.get('refreshToken')
            && !!Cookies.get('UserInfo');
    }
    return false;
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    cookieService.clearCookies();
    window.location.href = SHARED_ROUTES.ANGULAR.AUTH.LOGOUT;
};





export const authListener = (callback: (isAuth: boolean) => void) => {
    const handleStorageChange = () => {
        callback(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
};