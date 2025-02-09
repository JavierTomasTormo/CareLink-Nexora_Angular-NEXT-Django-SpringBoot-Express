import Cookies from 'js-cookie';

export const getCookies = () => {
    return {
        accessToken: Cookies.get('accessToken'),
        refreshToken: Cookies.get('refreshToken'),
        UserInfo: Cookies.get('UserInfo')
    };
};

export const syncCookiesToLocalStorage = () => {
    const { accessToken, refreshToken, UserInfo } = getCookies();
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('UserInfo', UserInfo || '');
    }
};