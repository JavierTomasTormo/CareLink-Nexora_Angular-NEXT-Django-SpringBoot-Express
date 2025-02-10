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

export const getUserInfo = () => {
    const user = Cookies.get('UserInfo') || localStorage.getItem('UserInfo');
    return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
    return Cookies.get('accessToken') || localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return Cookies.get('refreshToken') || localStorage.getItem('refreshToken');
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('UserInfo');
    window.location.href = SHARED_ROUTES.ANGULAR.AUTH.LOGOUT;
};





export const authListener = (callback: (isAuth: boolean) => void) => {
    const handleStorageChange = () => {
        callback(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
};