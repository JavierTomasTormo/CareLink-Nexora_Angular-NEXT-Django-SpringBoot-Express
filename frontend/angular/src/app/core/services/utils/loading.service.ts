import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class LoadingService {
    private isLoading = new BehaviorSubject<boolean>(false);
    public loading$ = this.isLoading.asObservable();

    // Mostrar loading
    show(): void {
        this.isLoading.next(true);
    }

    // Ocultar loading
    hide(): void {
        this.isLoading.next(false);
    }

    // Obtener estado actual
    get state(): boolean {
        return this.isLoading.value;
    }
}