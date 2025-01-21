'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/home/CarrouselSecundario.module.css';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CarrouselSecundario: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = [
        {
          id: 1,
          title: 'Yoga',
          description: 'Clases de yoga al aire libre.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',

        },
        {
          id: 2,
          title: 'Meditación',
          description: 'Sesiones de meditación guiada.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
        {
          id: 3,
          title: 'Pilates',
          description: 'Entrenamiento personalizado de pilates.',
          image: '/assets/home/carrouselPrincipal/carrousel1.jpg',
        },
      ];
      setActivities(data);
    };

    fetchActivities();
  }, []);

  return (
    <div className={styles.carrousel}>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.card}>
          <img src={activity.image} alt={activity.title} />
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CarrouselSecundario;
