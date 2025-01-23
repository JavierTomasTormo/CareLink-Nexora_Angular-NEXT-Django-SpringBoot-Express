// Carrousel.tsx
'use client';

import { useState, useEffect } from 'react';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '../../styles/home/CarrouselSecundario.module.css';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CarrouselSecundario: React.FC = () => {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = [
        {
          id: 1,
          title: 'Yoga',
          description: 'Descubre la armonía entre cuerpo y mente con nuestras clases de yoga al aire libre.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
        {
          id: 2,
          title: 'Meditación',
          description: 'Encuentra tu paz interior con nuestras sesiones de meditación guiada por expertos.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
        {
          id: 3,
          title: 'Pilates',
          description: 'Fortalece tu cuerpo y mejora tu postura con nuestro entrenamiento personalizado de pilates.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
        {
          id: 4,
          title: 'Pilates',
          description: 'Fortalece tu cuerpo y mejora tu postura con nuestro entrenamiento personalizado de pilates.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
      ];
      setTimeout(() => setActivities(data), 1500);
    };

    fetchActivities();
  }, []);

  const handlePrevSlide = () => {
    if (activities) {
      setCurrentIndex((prevIndex) => {
        const maxIndex = isMobile ? activities.length - 1 : activities.length - 2;
        return prevIndex === 0 ? maxIndex : prevIndex - 1;
      });
    }
  };

  const handleNextSlide = () => {
    if (activities) {
      setCurrentIndex((prevIndex) => {
        const maxIndex = isMobile ? activities.length - 1 : activities.length - 2;
        return prevIndex === maxIndex ? 0 : prevIndex + 1;
      });
    }
  };

  return (
    <div className={styles.carrouselContainer}>
      <h2 className={styles.sectionTitle}>Nuestras Actividades</h2>
      <div className={styles.carrousel}>
        {activities ? (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrevSlide}
              aria-label="Anterior"
            >
              ‹
            </button>
            <div
              className={styles.cardsContainer}
              style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)` }}
            >
              {activities.map((activity) => (
                <div key={activity.id} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <img src={activity.image} alt={activity.title} loading="lazy" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <button className={styles.learnMore}>Saber más</button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNextSlide}
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        ) : (
          <SkeletonLoader type="card" count={1} />
        )}
      </div>
    </div>
  );
};

export default CarrouselSecundario;