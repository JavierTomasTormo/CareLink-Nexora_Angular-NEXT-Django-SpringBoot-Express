'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        <>
            <div className={styles.container}>
                <div className={styles.card_left}>
                        <Image src="https://www.suacasa.es/images/suacasa-servicios-portada.jpg" alt="Servicio 1" layout="fill" objectFit="cover" />
                        {/* <img src="https://www.suacasa.es/images/suacasa-servicios-portada.jpg" alt="Servicio 1" /> */}
                    <div className={styles.card_text}>
                        <p>Servicios especializados para el cuidado.</p>
                    </div>
                </div>
                <div className={styles.card_top}>
                        <Image src="https://www.eninter.com/wp-content/uploads/2024/09/elevador-para-escaleras-768x768.png" alt="Servicio 2" layout="fill" objectFit="cover" />
                        {/* <img src="https://www.eninter.com/wp-content/uploads/2024/09/elevador-para-escaleras-768x768.png" alt="Servicio 2" /> */}
                    <div className={styles.card_text}>
                        <p>Instalaciones modernas diseñadas para el confort.</p>
                    </div>
                </div>
                <div className={styles.card_right}>
                        <Image src="https://media.licdn.com/dms/image/v2/C4E12AQEfl5p65AJacA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520137242972?e=2147483647&v=beta&t=UZnv9J9cbz83E7ovx16NIg3vtOyUtdzvglyV3jtV1OI" alt="Servicio 3" layout="fill" objectFit="cover" />
                        {/* <img src="https://media.licdn.com/dms/image/v2/C4E12AQEfl5p65AJacA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520137242972?e=2147483647&v=beta&t=UZnv9J9cbz83E7ovx16NIg3vtOyUtdzvglyV3jtV1OI" alt="Servicio 3" /> */}
                    <div className={styles.card_text}>
                        <p>Personal cualificado disponible las 24 horas del día.</p>
                    </div>
                </div>
                <div className={styles.card_bottom}>
                        <Image src="https://personaswip.com/modules/dbblog/views/img/post/b-blog-recreativa.jpg" alt="Servicio 4" layout="fill" objectFit="cover" />
                        {/* <img src="https://personaswip.com/modules/dbblog/views/img/post/b-blog-recreativa.jpg" alt="Servicio 4" /> */}
                    <div className={styles.card_text}>
                        <p>Actividades recreativas y terapéuticas personalizadas.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdditionalInfo;