'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/home/FreshBeansActivitie/FreshActivities.module.css';
import { FreshActivitiesSkeleton } from '@/components/skeletons/HomeSkeletons';
import Link from 'next/link';

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
        <motion.div 
            className={styles.half_sect}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className={styles.half_first}>
                <motion.div 
                    className={styles.description}
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className={styles.description_title}>Actividades Vitales</h2>
                    <p className={styles.description_p}>
                        Descubre una amplia gama de actividades diseñadas para enriquecer la vida de tus seres queridos. 
                        Nuestros programas están cuidadosamente planificados para estimular tanto el cuerpo como la mente, 
                        promoviendo un estilo de vida activo y saludable en un ambiente acogedor y seguro.
                    </p>
                    <Link href="/shop" className={styles.btn}>Explorar Actividades</Link>
                </motion.div>
            </div>
            <div className={styles.half_second}></div>
        </motion.div>
    );
};

export default FreshActivities;