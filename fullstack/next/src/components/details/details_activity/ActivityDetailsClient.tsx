'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchActivity, selectActivitiesStatus, selectActivitiesError } from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '@/styles/details/ActivityDetails.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUserInfo } from '@/utils/auth';

const ActivityDetailsClient: React.FC<{ activityId: string }> = ({ activityId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const activity = useSelector((state: RootState) => state.activities.activities.find(a => a.id === parseInt(activityId)));
    const status = useSelector(selectActivitiesStatus);
    const error = useSelector(selectActivitiesError);
    const isLoggedIn = isAuthenticated();
    const userInfo = getUserInfo();

    useEffect(() => {
        if (!activity) {
            dispatch(fetchActivity(parseInt(activityId)));
        }
    }, [activityId, dispatch, activity]);

    const handleInscription = () => {
        if (!isLoggedIn) {
            router.push('http://localhost:4200/auth/login');
        } else {
            router.push(`/inscriptions/${activityId}`);
        }
    };

    if (status === 'loading') {
        return (
            <div className={styles.loaderContainer}>
                <SkeletonLoader type="card" count={1} />
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className={`${styles.activityContainer} ${styles.errorContainer}`}>
                <div className={styles.errorContent}>
                    <h2 className={styles.errorTitle}>¡Ups! Algo salió mal</h2>
                    <p className={styles.errorMessage}>{error || 'No pudimos conectar con el servidor. Por favor, inténtalo de nuevo más tarde.'}</p>
                    <button 
                        className={styles.retryButton}
                        onClick={() => dispatch(fetchActivity(parseInt(activityId)))}
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className={`${styles.activityContainer} ${styles.emptyContainer}`}>
                <div className={styles.emptyContent}>
                    <h2 className={styles.emptyTitle}>No hay información disponible</h2>
                    <p className={styles.emptyMessage}>Vuelve más tarde para descubrir más detalles sobre esta actividad.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.activityDetails}>
            <h1 className={styles.title}>{activity.name_activitie}</h1>
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
            </div>
            <div className={styles.detailsContent}>
                <p className={styles.description}>{activity.description || 'Sin descripción disponible'}</p>
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
                <div className={styles.tagsWrapper}>
                    {Array.isArray(activity.caracteristics) && activity.caracteristics.length > 0 ? (
                        activity.caracteristics.map((tag: string, index: number) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))
                    ) : (
                        <span className={styles.noTags}>Sin etiquetas</span>
                    )}
                </div>
                <button className={styles.inscriptionButton} onClick={handleInscription}>
                    Inscribirse
                </button>
            </div>
        </div>
    );
};

export default ActivityDetailsClient;

const getDayOfWeek = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber % 7];
};