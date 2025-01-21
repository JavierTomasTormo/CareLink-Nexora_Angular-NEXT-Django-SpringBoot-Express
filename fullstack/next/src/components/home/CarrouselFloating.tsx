import React, { useState, useEffect } from 'react'
import styles from '../../styles/home/CarrouselFloating.module.css'

const CarrouselMini = () => {
  const slides = [
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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
  )
}

export default CarrouselMini