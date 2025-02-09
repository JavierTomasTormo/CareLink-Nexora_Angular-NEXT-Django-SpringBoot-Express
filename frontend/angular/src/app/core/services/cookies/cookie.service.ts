import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookies(accessToken: string, refreshToken: string, user: any): void {
    Cookies.set('accessToken', accessToken, { expires: 1 }); // 1 día
    Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 días
    Cookies.set('UserInfo', JSON.stringify(user), { expires: 7 });
  }

    getCookies() {
        return {
            accessToken: Cookies.get('accessToken'),
            refreshToken: Cookies.get('refreshToken'),
            UserInfo: Cookies.get('UserInfo')
        };
    }

    clearCookies(): void {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('UserInfo');
    }
}