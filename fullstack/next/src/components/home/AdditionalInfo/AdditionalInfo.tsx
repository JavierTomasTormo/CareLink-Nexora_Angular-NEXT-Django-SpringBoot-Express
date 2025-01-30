'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/home/AdditionalInfo/AdditionalInfo.module.css';
import { AdditionalInfoSkeleton } from '@/components/skeletons/HomeSkeletons';

const AdditionalInfo = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <AdditionalInfoSkeleton />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card_left}>
                <div className={styles.card_image}>
                    <img src="https://www.suacasa.es/images/suacasa-servicios-portada.jpg" alt="Servicio 1" />
                </div>
                <div className={styles.card_text}>
                    <p>Ofrecemos servicios especializados para el cuidado integral de nuestros residentes.</p>
                </div>
            </div>
            <div className={styles.card_top}>
                <div className={styles.card_image}>
                    <img src="https://www.eninter.com/wp-content/uploads/2024/09/elevador-para-escaleras-768x768.png" alt="Servicio 2" />
                </div>
                <div className={styles.card_text}>
                    <p>Instalaciones modernas diseñadas para el confort y la seguridad.</p>
                </div>
            </div>
            <div className={styles.card_right}>
                <div className={styles.card_image}>
                    <img src="https://media.licdn.com/dms/image/v2/C4E12AQEfl5p65AJacA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520137242972?e=2147483647&v=beta&t=UZnv9J9cbz83E7ovx16NIg3vtOyUtdzvglyV3jtV1OI" alt="Servicio 3" />
                </div>
                <div className={styles.card_text}>
                    <p>Personal cualificado disponible las 24 horas del día.</p>
                </div>
            </div>
            <div className={styles.card_bottom}>
                <div className={styles.card_image}>
                    <img src="https://personaswip.com/modules/dbblog/views/img/post/b-blog-recreativa.jpg" alt="Servicio 4" />
                </div>
                <div className={styles.card_text}>
                    <p>Actividades recreativas y terapéuticas personalizadas.</p>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfo;