'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/FreshBeansActivitie/FreshActivities.module.css';
import { FreshActivitiesSkeleton } from '@/components/skeletons/HomeSkeletons';

const FreshActivities = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <FreshActivitiesSkeleton />;
    }
    
    return (
        <div className={styles.half_sect}>
            <div className={styles.half_first}>
                <div className={styles.description}>
                    <h2 className={styles.description_title}>NUESTRAS ACTIVIDADES</h2>
                    <p className={styles.description_p}>
                        Descubre una amplia gama de actividades diseñadas para mejorar tu bienestar. Desde sesiones de yoga y meditación hasta clases de fitness y talleres nutricionales, nuestra diversa oferta de programas se adapta a todos los niveles de experiencia y objetivos de bienestar.
                    </p>
                    <a href="#" className={styles.btn}>Ver Actividades</a>
                </div>
            </div>
            <div className={styles.half_second}></div>
        </div>
    );
};

export default FreshActivities;