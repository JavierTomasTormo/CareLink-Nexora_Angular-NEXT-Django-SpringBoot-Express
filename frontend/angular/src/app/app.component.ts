// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
        <main>
            <h1>VitalNest</h1>
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [`
        main {
        padding: 1rem;
        }
    `]
})
export class AppComponent {
    title = 'angular-app';
}