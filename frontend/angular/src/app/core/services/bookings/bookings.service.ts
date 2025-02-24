import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.routes';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  getBookings(): Observable<any> {
    const headers = this.tokenService.getAuthorizationHeader() || {}
    return this.http.get<any>(API_ROUTES.BOOKINGS.GET_ALL, { headers });
  }
}
