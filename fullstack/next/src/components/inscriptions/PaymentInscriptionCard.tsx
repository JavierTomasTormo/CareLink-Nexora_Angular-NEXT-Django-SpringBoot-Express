'use client';

import React, { useState, useEffect, useRef } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/services/payments/paymentsService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '@/styles/inscriptions/PaymentInscriptionCard.module.css';

const PaymentInscriptionCard: React.FC<{ amount: number }> = ({ amount }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [cardElement, setCardElement] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusElementStyle, setFocusElementStyle] = useState<React.CSSProperties | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const minCardYear = new Date().getFullYear();
  const amexCardMask = '#### ###### #####';
  const otherCardMask = '#### #### #### ####';
  const cardNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cardNumberRef.current) {
      cardNumberRef.current.focus();
    }
  }, []);

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

  const getCardType = () => {
    const number = cardNumber;
    if (/^4/.test(number)) return 'visa';
    if (/^(34|37)/.test(number)) return 'amex';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^6011/.test(number)) return 'discover';
    if (/^9792/.test(number)) return 'troy';
    return 'visa';
  };

  const generateCardNumberMask = () => (getCardType() === 'amex' ? amexCardMask : otherCardMask);

  const minCardMonth = () => (cardYear === minCardYear.toString() ? new Date().getMonth() + 1 : 1);

  const handleFocusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsInputFocused(true);
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const cardForm = document.querySelector(`.${styles['card-form']}`);
    const cardFormRect = cardForm?.getBoundingClientRect();

    if (cardFormRect) {
      setFocusElementStyle({
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${rect.left - cardFormRect.left}px) translateY(${rect.top - cardFormRect.top}px)`,
        opacity: 1
      });
    }
  };

  const handleBlurInput = () => {
    setIsInputFocused(false);
    setFocusElementStyle(null);
  };

  const handleFlipCard = (status: boolean) => {
    setIsCardFlipped(status);
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
    const placeholder = generateCardNumberMask().split('');
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
    const rect = target.getBoundingClientRect();
    const cardForm = document.querySelector(`.${styles['card-form']}`);
    const cardFormRect = cardForm?.getBoundingClientRect();

    if (cardFormRect) {
      setFocusElementStyle({
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${rect.left - cardFormRect.left}px) translateY(${rect.top - cardFormRect.top}px)`,
        opacity: 1
      });
    }
  };

  const blurInput = () => {
    setIsInputFocused(false);
    setFocusElementStyle(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['card-form']}>
        <div className={styles['card-list']}>
          <div className={`${styles['card-item']} ${isCardFlipped ? styles['-active'] : ''}`}>
            <div className={`${styles['card-item__side']} ${styles['-front']}`}>
              <div
                className={`${styles['card-item__focus']} ${focusElementStyle ? styles['-active'] : ''}`}
                style={focusElementStyle || undefined}
              ></div>
              <div className={styles['card-item__cover']}>
                <img
                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
                  className={styles['card-item__bg']}
                />
              </div>
              <div className={styles['card-item__wrapper']}>
                <div className={styles['card-item__top']}>
                  <img
                    src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                    className={styles['card-item__chip']}
                  />
                  <div className={styles['card-item__type']}>
                    <img
                      src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`}
                      alt=""
                      className={styles['card-item__typeImg']}
                    />
                  </div>
                </div>
                <div className={styles['card-item__number']}>
                  <TransitionGroup component={null}>
                    {renderCardNumber()}
                  </TransitionGroup>
                </div>
                <div className={styles['card-item__content']}>
                  <label htmlFor="cardName" className={styles['card-item__info']}>
                    <div className={styles['card-item__holder']}>Card Holder</div>
                    <div className={styles['card-item__name']}>
                      {cardName || 'Full Name'}
                    </div>
                  </label>
                  <div className={styles['card-item__date']}>
                    <label htmlFor="cardMonth" className={styles['card-item__dateTitle']}>Expires</label>
                    <label htmlFor="cardMonth" className={styles['card-item__dateItem']}>
                      {cardMonth || 'MM'}
                    </label>
                    /
                    <label htmlFor="cardYear" className={styles['card-item__dateItem']}>
                      {cardYear ? cardYear.slice(2, 4) : 'YY'}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles['card-item__side']} ${styles['-back']}`}>
              <div className={styles['card-item__cover']}>
                <img
                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
                  className={styles['card-item__bg']}
                />
              </div>
              <div className={styles['card-item__band']}></div>
              <div className={styles['card-item__cvv']}>
                <div className={styles['card-item__cvvTitle']}>CVV</div>
                <div className={styles['card-item__cvvBand']}>
                  {cardCvv.split('').map((_, index) => (
                    <span key={index}>*</span>
                  ))}
                </div>
                <div className={styles['card-item__type']}>
                  <img
                    src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`}
                    className={styles['card-item__typeImg']}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['card-form__inner']}>
          <form onSubmit={handlePayment}>
            <div className={styles['card-input']}>
              <label htmlFor="cardNumber" className={styles['card-input__label']}>Card Number</label>
              <input
                type="text"
                id="cardNumber"
                className={styles['card-input__input']}
                ref={cardNumberRef}
                value={cardNumber}
                onChange={handleCardNumberChange}
                onFocus={handleFocusInput}
                onBlur={handleBlurInput}
                autoComplete="off"
                maxLength={19}
              />
            </div>
            <div className={styles['card-input']}>
              <label htmlFor="cardName" className={styles['card-input__label']}>Card Holders</label>
              <input
                type="text"
                id="cardName"
                className={styles['card-input__input']}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                onFocus={handleFocusInput}
                onBlur={handleBlurInput}
                autoComplete="off"
              />
            </div>
            <div className={styles['card-form__row']}>
              <div className={styles['card-form__col']}>
                <div className={styles['card-form__group']}>
                  <label htmlFor="cardMonth" className={styles['card-input__label']}>Expiration Date</label>
                  <select
                    className={`${styles['card-input__input']} ${styles['-select']}`}
                    id="cardMonth"
                    value={cardMonth}
                    onChange={(e) => setCardMonth(e.target.value)}
                    onFocus={handleFocusInput}
                    onBlur={handleBlurInput}
                  >
                    <option value="" disabled>Month</option>
                    {[...Array(12)].map((_, n) => (
                      <option key={n} value={n < 9 ? `0${n + 1}` : n + 1} disabled={n + 1 < minCardMonth()}>
                        {n < 9 ? `0${n + 1}` : n + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`${styles['card-input__input']} ${styles['-select']}`}
                    id="cardYear"
                    value={cardYear}
                    onChange={(e) => setCardYear(e.target.value)}
                    onFocus={handleFocusInput}
                    onBlur={handleBlurInput}
                  >
                    <option value="" disabled>Year</option>
                    {[...Array(12)].map((_, index) => (
                      <option key={index} value={minCardYear + index}>
                        {minCardYear + index}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`${styles['card-form__col']} ${styles['-cvv']}`}>
                <div className={styles['card-input']}>
                  <label htmlFor="cardCvv" className={styles['card-input__label']}>CVV</label>
                  <input
                    type="text"
                    className={styles['card-input__input']}
                    id='cardCvv'
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    onFocus={(e) => {
                      handleFlipCard(true);
                      handleFocusInput(e);
                    }}
                    onBlur={(e) => {
                      handleFlipCard(false);
                      handleBlurInput();
                    }}
                    maxLength={4}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div id="card-element" className={styles['card-input']}></div>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <button className={styles['card-form__button']} type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : `Pay €${amount}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentInscriptionCard;