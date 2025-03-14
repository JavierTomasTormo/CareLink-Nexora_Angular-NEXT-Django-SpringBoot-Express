import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  newsletterEmail: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail) {
      // Aquí iría la lógica para enviar la suscripción al backend
      console.log('Suscrito con email:', this.newsletterEmail);
      alert('¡Gracias por suscribirte a nuestro boletín!');
      this.newsletterEmail = '';
    }
  }
}