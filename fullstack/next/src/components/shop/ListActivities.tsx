"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { ActivityData } from '@/store/Constants';
import { 
  fetchActivities, 
  selectAllActivities, 
  selectActivitiesStatus, 
  selectActivitiesError 
} from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '@/styles/shop/ListActivities.module.css';

const ListActivities: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

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

  if (!activities || activities.length === 0) {
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

  return (
      <div className={styles.activitiesGrid}>
        {activities.map((activity: ActivityData) => (
          <article key={activity.id} className={styles.activityCard}>
            <div className={styles.activityHeader}>
              <h3 className={styles.activityTitle}>{activity.name_activitie}</h3>
              <span className={styles.activityPrice}>${activity.price || 0}</span>
            </div>
            <div className={styles.activityContent}>
              <p className={styles.activityDescription}>
                {activity.description || 'Sin descripción disponible'}
              </p>
              <div className={styles.activityImages}>
                {activity.images && activity.images.length > 0 ? (
                  activity.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={`/assets/shop/activities/${image.img}`} 
                      alt={activity.name_activitie} 
                      className={styles.activityImage} 
                    />
                  ))
                ) : (
                  <p>No hay imágenes disponibles</p>
                )}
              </div>
              <div className={styles.activityMeta}>
                <div className={styles.durationBadge}>
                  <span className={styles.durationIcon}>⏱</span>
                  <span>{activity.duration} minutos</span>
                </div>
              </div>
              <div className={styles.tagsContainer}>
                {Array.isArray(activity.caracteristics?.tags) && activity.caracteristics?.tags.length > 0 ? (
                  activity.caracteristics.tags.map((tag: string, index: number) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))
                ) : (
                  <span className={styles.noTags}>Sin etiquetas</span>
                )}
              </div>
            </div>
            <button className={styles.actionButton}>
              Ver más detalles
            </button>
          </article>
        ))}
      </div>
  );
};

export default ListActivities;
