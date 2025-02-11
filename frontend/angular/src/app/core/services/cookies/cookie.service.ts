import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { User } from '../../models/Users/user.model';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookies(accessToken: string, refreshToken: string, user: User): void {
    Cookies.set('accessToken', accessToken, { expires: 1 }); 
    Cookies.set('refreshToken', refreshToken, { expires: 7 }); 
    Cookies.set('UserInfo', JSON.stringify(user), { expires: 7 });
  }

    getCookies() {
        const userInfo = Cookies.get('UserInfo');
        return {
            accessToken: Cookies.get('accessToken'),
            refreshToken: Cookies.get('refreshToken'),
            UserInfo: userInfo ? JSON.parse(userInfo) : null
        };
    }

    getCurrentUser() {
      const user = Cookies.get('UserInfo');
        return user ? JSON.parse(user) : null;
    }

    getRefreshCookie() {
        return Cookies.get('refreshToken');
    }

    getAccessCookie() {
        return Cookies.get('accessToken');
    }

    clearCookies(): void {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('UserInfo');
    }
}