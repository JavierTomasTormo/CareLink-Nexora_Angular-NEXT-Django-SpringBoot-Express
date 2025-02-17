import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/payments/payments.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  stripe: Stripe | null = null;
  cardElement: any;
  amount: number = 10;  
  errorMessage: string = '';

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51QrKjnKX69XtcRsLuOj75ACotBmlmniVU1bdHgTpR7M3KUd8QWw7In1rcntKnrgflATuTd2MSFVIxmkZHfaxwCku00yQjq1hu7');
    
    if (!this.stripe) {
      this.errorMessage = 'Error al cargar Stripe';
      return;
    }

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card', { style: { base: { fontSize: '16px' } } });
    this.cardElement.mount('#card-element');
  }

  async pay(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const amountInput = form.querySelector("#amount") as HTMLInputElement;

    const amount = parseFloat(amountInput.value) || 0;
    const amountInCents = Math.round(amount * 100); // Convertimos a centavos

    console.log('Amount to send (in cents): ', amountInCents);

    if (!this.stripe) {
      this.errorMessage = 'Stripe no ha sido cargado correctamente.';
      return;
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      this.errorMessage = error.message || 'Error en el pago';
      return;
    }

    this.paymentService.createPayment(amountInCents).subscribe(
      async (res) => {
        const clientSecret = res.clientSecret;

        if (this.stripe) {
          const { error: confirmError, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

          if (confirmError) {
            this.errorMessage = confirmError.message || 'Error al procesar el pago';
          } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            alert('¡Pago realizado con éxito!');
          }
        } else {
          this.errorMessage = 'Error: Stripe no está disponible.';
        }
      },
      (err) => {
        this.errorMessage = err.error || 'Error al procesar el pago';
      }
    );
  }
}
