'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        const UserInfo = Cookies.get('UserInfo');

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (UserInfo) localStorage.setItem('UserInfo', UserInfo);
        }
    }, []);

    return <>{children}</>;
}