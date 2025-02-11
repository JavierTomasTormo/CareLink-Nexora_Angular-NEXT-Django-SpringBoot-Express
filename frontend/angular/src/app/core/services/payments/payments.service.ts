import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // Cambié la URL aquí a la nueva ruta de tu backend
  private apiUrl = 'http://localhost:8085/api/payments/create-payment-intent';

  constructor(private http: HttpClient) {}

  // Método actualizado para hacer POST a la nueva URL
  createPayment(amount: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      amount,
    });
  }
}
