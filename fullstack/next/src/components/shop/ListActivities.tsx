'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { ActivityData } from '@/store/Constants';
import { 
  fetchActivities, 
  selectFilteredActivities,
  selectActivitiesStatus, 
  selectActivitiesError 
} from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '@/styles/shop/ListActivities.module.css';

const ListActivities: React.FC<{ typeActivity: number | null }> = ({ typeActivity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const activities = useSelector(selectFilteredActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

  const filteredActivities: ActivityData[] = activities.filter((activity: ActivityData): boolean => 
    activity.activity_type === typeActivity
  );

  if (status === 'loading') {
    return (
      <div className={styles.loaderContainer}>
        <SkeletonLoader type="card" count={3} />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={`${styles.activitiesContainer} ${styles.errorContainer}`}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorTitle}>¡Ups! Algo salió mal</h2>
          <p className={styles.errorMessage}>{error || 'No pudimos conectar con el servidor. Por favor, inténtalo de nuevo más tarde.'}</p>
          <button 
            className={styles.retryButton}
            onClick={() => dispatch(fetchActivities())}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!filteredActivities || filteredActivities.length === 0) {
    return (
      <div className={`${styles.activitiesContainer} ${styles.emptyContainer}`}>
        <div className={styles.emptyContent}>
          <h2 className={styles.emptyTitle}>No hay actividades disponibles</h2>
          <p className={styles.emptyMessage}>Vuelve más tarde para descubrir nuevas actividades emocionantes.</p>
          <button 
            className={styles.refreshButton}
            onClick={() => dispatch(fetchActivities())}
          >
            Actualizar
          </button>
        </div>
      </div>
    );
  }

  const getDayOfWeek = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber % 7];
  };

  const handleExploreActivity = (id: number) => {
    router.push(`/details_activities/${id}`);
  };

  return (
    <div className={styles.activitiesGrid}>
      {filteredActivities.map((activity: ActivityData) => (
        <article key={activity.id} className={styles.activityCard}>
          <div className={styles.imageWrapper}>
            {activity.images && activity.images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className={styles.swiperContainer}
              >
                {activity.images.map((imgObj, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={`/assets/shop/activities/${imgObj.img}`} 
                      alt={`${activity.name_activitie} - Imagen ${index + 1}`} 
                      className={styles.mainImage} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.noImage}>Sin imagen</div>
            )}
            <div className={styles.priceTag}>${activity.price || 0}</div>
          </div>
          
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{activity.name_activitie}</h3>
            
            <div className={styles.separator}></div>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.icon}>⏱</span>
                <span className={styles.value}>{activity.duration} min</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>👥</span>
                <span className={styles.value}>{activity.max_participants} personas</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>💪</span>
                <span className={styles.value}>Nivel {activity.intensity}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>📅</span>
                <span className={styles.value}>{getDayOfWeek(activity.id_dayoftheweek)}</span>
              </div>
            </div>
            
            <div className={styles.separator}></div>
            
            <p className={styles.description}>
              {activity.description || 'Sin descripción disponible'}
            </p>
            
            <div className={styles.separator}></div>
            
            <div className={styles.tagsWrapper}>
              {Array.isArray(activity.caracteristics) && activity.caracteristics.length > 0 ? (
                activity.caracteristics.map((tag: string, index: number) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))
              ) : (
                <span className={styles.noTags}>Sin etiquetas</span>
              )}
            </div>
            
            <button 
              className={styles.detailButton}
              onClick={() => handleExploreActivity(activity.id)}
            >
              Explorar Actividad
              <span className={styles.buttonIcon}>→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ListActivities;