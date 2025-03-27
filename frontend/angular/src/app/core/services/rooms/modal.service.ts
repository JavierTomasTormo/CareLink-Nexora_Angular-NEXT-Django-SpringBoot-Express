import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');
  private modalData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  getData(): Observable<any> {
    return this.modalData.asObservable();
  }

  open(data: any): void {
    this.modalData.next(data);
    // console.log('Data sent to modal:', data);
    this.display.next('open');
  }

  close(): void {
    this.display.next('close');
  }
}