'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/GreatMealsSection/GreatMealsSection.module.css';
import { GreatMealsSkeleton } from '@/components/skeletons/HomeSkeletons';

const GreatMealsSection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <GreatMealsSkeleton />;
    }
    
    return (
        <section className={styles.sect_great}>
        <div className={styles.container}>
            <div className={styles.row}>
            <div className={styles.content_wrapper}>
                <div className={styles.description}>
                <h2 className={styles.description_title}>EXCELENTES COMIDAS</h2>
                <p className={styles.description_p}>
                    Descubre nuestra selección de platos nutritivos y deliciosos, preparados con ingredientes frescos y de alta calidad.<br/> Nuestro menú está diseñado para satisfacer todos los gustos y necesidades dietéticas, ofreciendo opciones saludables que no comprometen el sabor.
                </p>
                <a href="#" className={styles.btn}>Ver Menú</a>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default GreatMealsSection;