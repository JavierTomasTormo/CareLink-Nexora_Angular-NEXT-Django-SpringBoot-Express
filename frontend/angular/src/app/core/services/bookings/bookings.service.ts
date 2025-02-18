import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:8085/inscriptions/user';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    console.log('Access Token:', token); // Log de depuración
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}