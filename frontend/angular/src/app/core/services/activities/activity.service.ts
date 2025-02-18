import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8000/api/activities';

  constructor(private http: HttpClient) {}

  getActivityById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }
}