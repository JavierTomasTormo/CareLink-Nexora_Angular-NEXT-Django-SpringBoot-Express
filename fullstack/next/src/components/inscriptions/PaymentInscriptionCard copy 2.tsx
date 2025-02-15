'use client';

import React, { useEffect, useState, useRef } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/services/payments/paymentsService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '@/styles/inscriptions/PaymentInscriptionCard.module.css';

const PaymentInscriptionCard: React.FC<{ amount: number }> = ({ amount }) => {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [cardElement, setCardElement] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardName, setCardName] = useState<string>('');
    const [cardMonth, setCardMonth] = useState<string>('');
    const [cardYear, setCardYear] = useState<string>('');
    const [cardCvv, setCardCvv] = useState<string>('');
    const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
    const [focusedInput, setFocusedInput] = useState<string>('');
    const focusElementRef = useRef<HTMLDivElement>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    const cardBackgrounds = [
        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/11.jpeg',
        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/12.jpeg',
        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/8.jpeg',
        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/9.jpeg',
        'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/10.jpeg',
    ];

    const [selectedBackground] = useState(cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)]);

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
            const response = await createPaymentIntent(amountInCents);
            
            if (response && response.clientSecret) {
                const clientSecret = response.clientSecret;
                
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });
    
                if (confirmError) {
                    setErrorMessage(confirmError.message || 'Error al procesar el pago');
                } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                    alert('¡Pago realizado con éxito!');
                }
            } else {
                setErrorMessage('El clientSecret no está presente en la respuesta del backend.');
            }
        } catch (err) {
            console.error('Error al procesar el pago:', err);
            setErrorMessage('Error al procesar el pago');
        } finally {
            setIsLoading(false);
        }
    };

    const formatCardNumber = (value: string) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
    };

    const renderCardNumber = () => {
        const cardNumberArray = cardNumber.split('');
        const placeholder = '#### #### #### ####'.split('');
        return placeholder.map((char, index) => {
            if (cardNumberArray[index]) {
                if (index > 4 && index < 15 && cardNumberArray[index] !== ' ') {
                    return (
                        <CSSTransition key={index} timeout={300} classNames="slide-fade-up">
                            <span className={styles["card-item__numberItem"]}>*</span>
                        </CSSTransition>
                    );
                }
                return (
                    <CSSTransition key={index} timeout={300} classNames="slide-fade-up">
                        <span className={styles["card-item__numberItem"]}>{cardNumberArray[index]}</span>
                    </CSSTransition>
                );
            }
            return (
                <CSSTransition key={index} timeout={300} classNames="slide-fade-up">
                    <span className={styles["card-item__numberItem"]}>{char}</span>
                </CSSTransition>
            );
        });
    };

    const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIsInputFocused(true);
        const target = e.target;
        setFocusedInput(target.dataset.ref || '');
        if (focusElementRef.current) {
            focusElementRef.current.style.width = `${target.offsetWidth}px`;
            focusElementRef.current.style.height = `${target.offsetHeight}px`;
            focusElementRef.current.style.transform = `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`;
        }
    };

    const blurInput = () => {
        setTimeout(() => {
            if (!isInputFocused) {
                setFocusedInput('');
                if (focusElementRef.current) {
                    focusElementRef.current.style.width = '0';
                    focusElementRef.current.style.height = '0';
                    focusElementRef.current.style.transform = 'none';
                }
            }
        }, 300);
        setIsInputFocused(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles["card-form"]}>
                <div className={styles["card-list"]}>
                    <div className={`${styles["card-item"]} ${isCardFlipped ? styles["-active"] : ""}`}>
                        <div className={`${styles["card-item__side"]} ${styles["-front"]}`}>
                            <div ref={focusElementRef} className={`${styles["card-item__focus"]} ${focusedInput ? styles["-active"] : ""}`}></div>
                            <div className={styles["card-item__cover"]}>
                                <img
                                    src={selectedBackground}
                                    className={styles["card-item__bg"]}
                                />
                            </div>
                            <div className={styles["card-item__wrapper"]}>
                                <div className={styles["card-item__top"]}>
                                    <img
                                        src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                        className={styles["card-item__chip"]}
                                    />
                                    <div className={styles["card-item__type"]}>
                                        <img
                                            src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                                            className={styles["card-item__typeImg"]}
                                        />
                                    </div>
                                </div>
                                <div 
                                    className={styles["card-item__number"]}
                                    onClick={() => focusInput({ target: { dataset: { ref: 'cardNumber' } } } as any)}
                                >
                                    <TransitionGroup component={null}>
                                        {renderCardNumber()}
                                    </TransitionGroup>
                                </div>
                                <div className={styles["card-item__content"]}>
                                    <div 
                                        className={styles["card-item__info"]}
                                        onClick={() => focusInput({ target: { dataset: { ref: 'cardName' } } } as any)}
                                    >
                                        <div className={styles["card-item__holder"]}>Card Holder</div>
                                        <div className={styles["card-item__name"]}>{cardName || "FULL NAME"}</div>
                                    </div>
                                    <div 
                                        className={styles["card-item__date"]}
                                        onClick={() => focusInput({ target: { dataset: { ref: 'cardDate' } } } as any)}
                                    >
                                        <div className={styles["card-item__dateTitle"]}>Expires</div>
                                        <div className={styles["card-item__dateItem"]}>
                                            {cardMonth || "MM"}/{cardYear || "YY"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["card-item__side"]} ${styles["-back"]}`}>
                            <div className={styles["card-item__cover"]}>
                                <img
                                    src={selectedBackground}
                                    className={styles["card-item__bg"]}
                                />
                            </div>
                            <div className={styles["card-item__band"]}></div>
                            <div className={styles["card-item__cvv"]}>
                                <div className={styles["card-item__cvvTitle"]}>CVV</div>
                                <div className={styles["card-item__cvvBand"]}>
                                    {cardCvv.split('').map((char, index) => (
                                        <span key={index}>*</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["card-form__inner"]}>
                    <form onSubmit={handlePayment}>
                        <div className={styles["card-input"]}>
                            <label className={styles["card-input__label"]}>Card Number</label>
                            <input
                                type="text"
                                className={styles["card-input__input"]}
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                maxLength={19}
                                onFocus={focusInput}
                                onBlur={blurInput}
                                data-ref="cardNumber"
                            />
                        </div>
                        <div className={styles["card-input"]}>
                            <label className={styles["card-input__label"]}>Card Holder</label>
                            <input
                                type="text"
                                className={styles["card-input__input"]}
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onFocus={focusInput}
                                onBlur={blurInput}
                                data-ref="cardName"
                            />
                        </div>
                        <div className={styles["card-form__row"]}>
                            <div className={styles["card-form__col"]}>
                                <div className={styles["card-form__group"]}>
                                    <select
                                        className={`${styles["card-input__input"]} ${styles["-select"]}`}
                                        value={cardMonth}
                                        onChange={(e) => setCardMonth(e.target.value)}
                                        onFocus={focusInput}
                                        onBlur={blurInput}
                                        data-ref="cardDate"
                                    >
                                        <option value="" disabled selected>Month</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                            <option key={month} value={month.toString().padStart(2, '0')}>
                                                {month.toString().padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className={`${styles["card-input__input"]} ${styles["-select"]}`}
                                        value={cardYear}
                                        onChange={(e) => setCardYear(e.target.value)}
                                        onFocus={focusInput}
                                        onBlur={blurInput}
                                        data-ref="cardDate"
                                    >
                                        <option value="" disabled selected>Year</option>
                                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={`${styles["card-form__col"]} ${styles["-cvv"]}`}>
                                <div className={styles["card-input"]}>
                                    <label className={styles["card-input__label"]}>CVV</label>
                                    <input
                                        type="text"
                                        className={styles["card-input__input"]}
                                        value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value)}
                                        maxLength={4}
                                        onFocus={() => {
                                            setIsCardFlipped(true);
                                            focusInput({ target: { dataset: { ref: 'cardCvv' } } } as any);
                                        }}
                                        onBlur={() => {
                                            setIsCardFlipped(false);
                                            blurInput();
                                        }}
                                        data-ref="cardCvv"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="card-element" className={styles["card-input"]}></div>
                        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                        <button className={styles["card-form__button"]} type="submit" disabled={isLoading}>
                            {isLoading ? "Processing..." : `Pay €${amount}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentInscriptionCard;