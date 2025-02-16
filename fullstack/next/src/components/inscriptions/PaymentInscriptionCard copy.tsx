'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/services/payments/paymentsService';
import styles from '@/styles/inscriptions/PaymentInscriptionCard.module.css';

const PaymentInscriptionCard: React.FC<{ amount: number }> = ({ amount }) => {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [cardElement, setCardElement] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initializeStripe = async () => {
            const stripeInstance = await loadStripe('pk_test_51QrKjnKX69XtcRsLuOj75ACotBmlmniVU1bdHgTpR7M3KUd8QWw7In1rcntKnrgflATuTd2MSFVIxmkZHfaxwCku00yQjq1hu7');
            setStripe(stripeInstance);

            if (stripeInstance) {
                const elements = stripeInstance.elements();
                const card = elements.create('card', { style: { base: { fontSize: '16px' } } });
                card.mount('#card-element');
                setCardElement(card);
            } else {
                setErrorMessage('Error al cargar Stripe');
            }
        };

        initializeStripe();
    }, []);

    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
    
        if (!stripe || !cardElement) {
            setErrorMessage('Stripe no ha sido cargado correctamente.');
            setIsLoading(false);
            return;
        }
    
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (error) {
            setErrorMessage(error.message || 'Error en el pago');
            setIsLoading(false);
            return;
        }
    
        try {
            const amountInCents = Math.round(amount);
            console.log('Monto que se enviará al backend:', amountInCents);
    
            const response = await createPaymentIntent(amountInCents);
            console.log('Respuesta del backend:', response);
            
            if (response && response.clientSecret) {
                const clientSecret = response.clientSecret;
                console.log('🚀 ~ file: PaymentInscriptionCard.tsx:67 ~ handlePayment ~ clientSecret:', clientSecret);
                
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });
    
                if (confirmError) {
                    setErrorMessage(confirmError.message || 'Error al procesar el pago1');
                } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                    alert('¡Pago realizado con éxito!');
                }
            } else {
                setErrorMessage('El clientSecret no está presente en la respuesta del backend.');
            }
        } catch (err) {
            console.error('Error al procesar el pago:', err);
            setErrorMessage('Error al procesar el pago2');
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <div className={styles.paymentForm}>
            <h1 className={styles.title}>Stripe Demo - Pago en Euros (€)</h1>
            <p>Tarjeta de prueba: <code>4242 4242 4242 4242</code></p>
            <form onSubmit={handlePayment}>
                <label htmlFor="amount" className={styles.label}>Monto a pagar (EUR):</label>
                <input type="number" value={amount} readOnly className={styles.input} />

                <div id="card-element" className={styles.formGroup}></div>
                {errorMessage && <div id="card-errors" className={styles.error}>{errorMessage}</div>}

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'Procesando...' : 'Pagar'}
                </button>
            </form>
        </div>
    );
};

export default PaymentInscriptionCard;
