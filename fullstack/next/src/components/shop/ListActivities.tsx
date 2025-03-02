'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { 
  fetchActivities, 
  selectAllActivities, 
  selectActivitiesStatus, 
  selectActivitiesError, 
  filterActivitiesByType 
} from '@/store/slices/activitiesSlice';
import styles from '@/styles/shop/ListActivities.module.css';
import Image from 'next/image';
import { ActivityData } from '@/store/Constants';

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
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);
  const [visibleCount, setVisibleCount] = useState(3);
  const prevTypeActivity = useRef(typeActivity);
  const [activeImages, setActiveImages] = useState<Record<number, number>>({});

  // Cargar actividades al inicio
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

  // Filtrar actividades por tipo cuando cambia
  useEffect(() => {
    dispatch(filterActivitiesByType(typeActivity));
    
    if (prevTypeActivity.current !== typeActivity) {
      console.log(`Tipo de actividad cambiado de ${prevTypeActivity.current} a ${typeActivity}, reseteando a 3 actividades`);
      setVisibleCount(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevTypeActivity.current = typeActivity;
    }
  }, [typeActivity, dispatch]);

  // Reiniciar filtros
  useEffect(() => {
    setVisibleCount(3);
  }, [minPrice, maxPrice, tags, difficulty]);

  // Cambiar imagen en el carrusel simple
  const changeImage = (activityId: number, direction: 'next' | 'prev', totalImages: number) => {
    setActiveImages(prev => {
      const currentIndex = prev[activityId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }
      
      return { ...prev, [activityId]: newIndex };
    });
  };

  // Seleccionar imagen directamente
  const selectImage = (activityId: number, index: number) => {
    setActiveImages(prev => ({ ...prev, [activityId]: index }));
  };

  const filteredActivities = activities.filter((activity: ActivityData) => {
    if (typeActivity !== null && activity.activity_type !== typeActivity) {
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
    setVisibleCount(prevCount => prevCount + 3);
  };

  if (status === 'loading') {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando actividades...</p>
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
          <p className={styles.emptyMessage}>No se encontraron actividades con los filtros seleccionados.</p>
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
        {visibleActivities.map((activity: ActivityData) => {
          const currentImageIndex = activeImages[activity.id] || 0;
          const images = activity.images || [];
          
          return (
            <article key={activity.id} className={styles.activityCard}>
              <div className={styles.imageWrapper}>
                {images.length > 0 ? (
                  <div className={styles.carouselContainer}>
                    <div className={styles.carouselImageContainer}>
                      <Image 
                        src={`/assets/shop/activities/${images[currentImageIndex].img}`} 
                        alt={`${activity.name_activitie}`} 
                        className={styles.mainImage}
                        width={500}
                        height={300}
                        priority={activity.id % visibleCount < 2} // Priorizar las primeras imágenes
                      />
                    </div>
                    
                    {images.length > 1 && (
                      <>
                        <button 
                          className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
                          onClick={(e) => {
                            e.preventDefault();
                            changeImage(activity.id, 'prev', images.length);
                          }}
                          aria-label="Imagen anterior"
                        >
                          ←
                        </button>
                        
                        <button 
                          className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
                          onClick={(e) => {
                            e.preventDefault();
                            changeImage(activity.id, 'next', images.length);
                          }}
                          aria-label="Siguiente imagen"
                        >
                          →
                        </button>
                        
                        <div className={styles.carouselIndicators}>
                          {images.map((_, index) => (
                            <span 
                              key={index}
                              className={`${styles.carouselIndicator} ${index === currentImageIndex ? styles.carouselIndicatorActive : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                selectImage(activity.id, index);
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Ver imagen ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
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
          );
        })}
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