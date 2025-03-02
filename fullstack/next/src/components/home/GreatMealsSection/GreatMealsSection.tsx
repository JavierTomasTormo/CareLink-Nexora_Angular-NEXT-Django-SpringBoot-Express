'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/GreatMealsSection/GreatMealsSection.module.css';
import { GreatMealsSkeleton } from '@/components/skeletons/HomeSkeletons';
import Link from 'next/link';   

const GreatMealsSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [backgroundClass, setBackgroundClass] = useState('');
    // const backgroundImage = '';

    useEffect(() => {
        const backgroundClasses = [
            styles.backgroundImage1,
            styles.backgroundImage2,
            styles.backgroundImage3
        ];
        
        // Seleccionar una clase aleatoria
        const randomIndex = Math.floor(Math.random() * backgroundClasses.length);
        setBackgroundClass(backgroundClasses[randomIndex]);
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <GreatMealsSkeleton />;
    }

    // const sectionStyle = {
    //     backgroundImage: `url(${backgroundImage})`,
    // };
    
    return (
        <section className={`${styles.sect_great} ${backgroundClass}`}>
        <div className={styles.container}>
            <div className={styles.row}>
            <div className={styles.content_wrapper}>
                <div className={styles.description}>
                <h2 className={styles.description_title}>EXCELENTES COMIDAS</h2>
                <p className={styles.description_p}>
                    Descubre nuestra selección de platos nutritivos y deliciosos, preparados con ingredientes frescos y de alta calidad.<br/> Nuestro menú está diseñado para satisfacer todos los gustos y necesidades dietéticas, ofreciendo opciones saludables que no comprometen el sabor.
                </p>
                {/* <a href="#" className={styles.btn}>Ver Menú</a> */}
                <Link href="/meals?meal_type=1" className={styles.btn}>Ver Menú</Link>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default GreatMealsSection;