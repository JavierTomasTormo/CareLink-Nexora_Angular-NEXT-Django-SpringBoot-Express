'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/home/CarrouselPrincipal.module.css';
import CarrouselFloating from './CarrouselFloating';

const CarrouselPrincipal: React.FC = () => {
  const slides = [
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.carrousel}>
        <div
          className={styles.slides}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Contenido flotante */}
        <div className={styles.floatingContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>Vital Nest</h1>
              <p className={styles.subtitle}>
                Especializados en cuidados, brindamos el mejor entorno para cuidar de las personas que amas.
              </p>
            </div>
            {/* Reemplazar imagen por carrusel flotante */}
            <div className={styles.imageContent}>
              <CarrouselFloating />
            </div>
          </div>
        </div>

        {/* Indicadores de diapositivas */}
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarrouselPrincipal;
