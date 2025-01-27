'use client';

import { useState, useEffect } from 'react';
// import { fetchAllMeals, fetchMealById } from '@/services/food/meals/mealsService';
// import { fetchAllBedRooms, fetchBedRoomById } from '@/services/rooms/bedroom/bedroomsService';
// import { fetchAllRooms, fetchRoomById } from '@/services/rooms/room/roomService';
// import { fetchAllActivities, fetchActivityById } from '@/services/activities/activitiesService';


import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '../../styles/home/CarrouselPrincipal.module.css';
import CarrouselFloating from './CarrouselFloating';
import { CarouselPrincipalSkeleton } from '@/components/skeletons/CarouselSkeletons';


const CarrouselPrincipal: React.FC = () => {

  const slides = [
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
    '/assets/home/carrouselPrincipal/carrousel1.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const loadImages = () => setTimeout(() => setIsLoading(false), 2000);
    loadImages();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);



  // useEffect(() => {
  //   const fetchBedRooms= async () => {
  //     try {
  //       const mealsData = await fetchAllRooms();
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchBedRooms();
  // }, []);

  // useEffect(() => {
  //   const fetchBedRoomsid = async () => {
  //     try {
  //       const mealsData = await fetchRoomById(3);
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchBedRoomsid();
  // }, []);

  // useEffect(() => {
  //   const fetchBedRooms= async () => {
  //     try {
  //       const mealsData = await fetchAllBedRooms();
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchBedRooms();
  // }, []);

  // useEffect(() => {
  //   const fetchBedRoomsid = async () => {
  //     try {
  //       const mealsData = await fetchBedRoomById(3);
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchBedRoomsid();
  // }, []);

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const mealsData = await fetchAllMeals();
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchMeals();
  // }, []);

  // useEffect(() => {
  //   const fetchMealsid = async () => {
  //     try {
  //       const mealsData = await fetchMealById(3);
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchMealsid();
  // }, []);

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const mealsData = await fetchAllActivities();
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchMeals();
  // }, []);

  // useEffect(() => {
  //   const fetchMealsid = async () => {
  //     try {
  //       const mealsData = await fetchActivityById(7);
  //       console.log('Meals data:', mealsData);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchMealsid();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CarouselPrincipalSkeleton />;
  }


  return (
    <div className={styles.container}>
      <div className={styles.carrousel}>
        {isLoading ? (
          <SkeletonLoader type="image" count={1} className={styles.skeletonImage} />
        ) : (
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
        )}

        <div className={styles.floatingContent}>
          <div className={styles.contentWrapper}>
            {isLoading ? (
              <SkeletonLoader type="text" count={3} />
            ) : (
              <>
                <div className={styles.textContent}>
                  <h1 className={styles.title}>Vital Nest</h1>
                  <p className={styles.subtitle}>
                    Especializados en cuidados, brindamos el mejor entorno para cuidar de las personas que amas.
                  </p>
                </div>
                <div className={styles.imageContent}>
                  <CarrouselFloating />
                </div>
              </>
            )}
          </div>
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
  );
};

export default CarrouselPrincipal;
