'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/home/Banner/BannerSection.module.css';
import { BannerSkeleton } from '@/components/skeletons/HomeSkeletons';
import { motion } from 'framer-motion';

const BannerSection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <BannerSkeleton />;
    }

    return (
        <div className={styles.banner}>
            <div className={styles.banner__overlay}>
                <motion.div 
                    className={styles.banner__container}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1 
                        className={styles.banner__title}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        VitalNest
                    </motion.h1>
                    <motion.p 
                        className={styles.banner__text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Cuidamos con compromiso, protegemos con innovación
                    </motion.p>
                    <motion.a 
                        href="#" 
                        className={`${styles.btn} ${styles.btn__opacity}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        Registrarse Ahora
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default BannerSection;
