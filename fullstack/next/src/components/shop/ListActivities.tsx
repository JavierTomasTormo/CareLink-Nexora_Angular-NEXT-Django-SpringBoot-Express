'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchActivities, selectActivitiesStatus, selectActivitiesError } from '@/store/slices/activitiesSlice';
import styles from '@/styles/shop/ListActivities.module.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ActivityData } from '@/store/Constants';
// import SkeletonLoader from '../common/SkeletonLoader';

interface ListActivitiesProps {
  typeActivity: number | null;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  difficulty?: string;
}


const ListActivities: React.FC<ListActivitiesProps> = ({ 
  typeActivity, 
  minPrice = 0, 
  maxPrice = 1000, 
  tags = [], 
  difficulty = "" 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const activities = useSelector((state: any) => state.activities?.data || []);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);
  const [visibleCount, setVisibleCount] = useState(4);
  const prevTypeActivity = useRef(typeActivity);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (prevTypeActivity.current !== typeActivity) {
      console.log(`Tipo de actividad cambiado de ${prevTypeActivity.current} a ${typeActivity}, reseteando a 4 actividades`);
      setVisibleCount(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevTypeActivity.current = typeActivity;
    }
  }, [typeActivity]);

  useEffect(() => {
    setVisibleCount(4);
  }, [minPrice, maxPrice, tags, difficulty]);



  const filteredActivities = activities.filter((activity: ActivityData) => {
    if (activity.activity_type !== typeActivity) {
      return false;
    }
    
    if ((activity.price < minPrice) || (activity.price > maxPrice)) {
      return false;
    }
    
    if (tags.length > 0 && activity.caracteristics) {
      const activityTags: string[] = Array.isArray(activity.caracteristics) ? activity.caracteristics : [];
      if (!tags.some(tag => activityTags.includes(tag))) {
        return false;
      }
    }
    
    if (difficulty && String(activity.intensity) !== difficulty) {
      return false;
    }
    
    return true;
  });


  const visibleActivities = filteredActivities.slice(0, visibleCount);
  const hasMoreActivities = visibleCount < filteredActivities.length;

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  if (status === 'loading') {
    return (
      <div className={styles.loaderContainer}>
        {/* <SkeletonLoader type="card" count={3} /> */}
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
    <div className={styles.activitiesContainer}>
      <div className={styles.activitiesSectionTitle}>
        <h2>
          {typeActivity === 1 ? "Servicios de Cuidado" :
          typeActivity === 2 ? "Actividades al Aire Libre" :
          typeActivity === 3 ? "Servicios de Rehabilitación" :
          typeActivity === 4 ? "Espacios de Relajación" :
          typeActivity === 5 ? "Programas Educativos" : "Actividades"}
          <span className={styles.activityCount}>{filteredActivities.length} actividades disponibles</span>
        </h2>
      </div>
      
      <div className={styles.activitiesGrid}>
        {visibleActivities.map((activity: ActivityData) => (
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
                      <Image 
                        src={`/assets/shop/activities/${imgObj.img}`} 
                        alt={`${activity.name_activitie} - Imagen ${index + 1}`} 
                        className={styles.mainImage}
                        width={500}
                        height={300} 
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
                  <span className={styles.value}>{getDayOfWeek(activity.id)}</span>
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
      
      {hasMoreActivities && (
        <div className={styles.loadMoreContainer}>
          <button 
            className={styles.loadMoreButton} 
            onClick={handleLoadMore}
          >
            Cargar más actividades ({visibleCount}/{filteredActivities.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ListActivities;