import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layout/header/header.component';   
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule, 
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        FormsModule
    ],
    template: `
        <main>
            <app-header></app-header>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
        </main>
    `
})
export class AppComponent {
    title = 'angular-app';
}
