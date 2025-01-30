'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';

import styles from '@/styles/home/BestRoomsSection/BestRoomsSection.module.css';
import { BestRoomsSkeleton } from '@/components/skeletons/HomeSkeletons';

const BestRoomsSection = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <BestRoomsSkeleton />;
    }

    return (
        <div className={styles.sect_best}>
        <div className={styles.container}>
            <div className={styles.row_center}>
            <div className={styles.content_col}>
                <h1 className={`${styles.sect_title} ${styles.best_bottom}`}>
                Habitaciones adaptadas para mayores
                </h1>
                <div className={styles.features_grid}>
                <div className={styles.feature_item}>
                    <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image 
                            src="/assets/defaultImages/iconAccesibilidad.png" 
                            width={65} 
                            height={65} 
                            className={styles.best_img} 
                            alt="Accesibilidad Total"
                            sizes="(max-width: 768px) 45px,
                                    (max-width: 1200px) 55px,
                                    65px"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%'
                            }}
                        />
                    </div>
                    <h2 className={styles.best_title}>Accesibilidad Total</h2>
                </div>
                <div className={styles.feature_item}>
                    <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image 
                            src="/assets/defaultImages/iconEmergency.png" 
                            width={70} 
                            height={70} 
                            className={styles.best_img} 
                            alt="Sistema de Emergencia"
                            sizes="(max-width: 768px) 50px,
                                    (max-width: 1200px) 60px,
                                    70px"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%'
                            }}
                        />
                    </div>
                    <h2 className={styles.best_title}>Sistema de Emergencia</h2>
                </div>
                <div className={styles.feature_item}>
                    <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image 
                            src="/assets/defaultImages/iconAsistencia.png" 
                            width={90} 
                            height={90} 
                            className={styles.best_img} 
                            alt="Sistema de Emergencia"
                            sizes="(max-width: 768px) 70px,
                                    (max-width: 1200px) 80px,
                                    90px"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%'
                            }}
                        />
                    </div>
                    <h2 className={styles.best_title}>Asistencia 24/7</h2>
                </div>
                </div>
                <p className={`${styles.sect_subtitle} ${styles.best_margin}`}>
                Nuestras habitaciones están especialmente diseñadas para garantizar el máximo confort y seguridad de nuestros residentes mayores, con características adaptadas a sus necesidades específicas.
                </p>
                <a href="#" className={`${styles.btn} ${styles.btn_top}`}>Conozca nuestras instalaciones</a>
            </div>
            </div>
        </div>
        </div>
    );
};

export default BestRoomsSection;
