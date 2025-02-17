import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class LoadingService {
    private isLoading = new BehaviorSubject<boolean>(false);
    public loading$ = this.isLoading.asObservable();

    show(): void {
        this.isLoading.next(true);
    }

    hide(): void {
        this.isLoading.next(false);
    }

    get state(): boolean {
        return this.isLoading.value;
    }
}