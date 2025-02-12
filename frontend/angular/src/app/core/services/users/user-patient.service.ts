import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.routes';
import { UserPatient } from '../../models/Users/user-patient.model';

@Injectable({
    providedIn: 'root'
})
export class UserPatientService {
    constructor(private http: HttpClient) {}

    getUserPatientsByUser(id_user: number): Observable<UserPatient[]> {
        return this.http.get<UserPatient[]>(API_ROUTES.USER_PATIENT.LIST_BY_USER(id_user));
    }
}