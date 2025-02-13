'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/GallerySection/GallerySection.module.css';
import { GallerySkeleton } from '@/components/skeletons/HomeSkeletons';

const GallerySection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <GallerySkeleton />;
    }
    return (
        <div className={styles.three_img}>
            <div className={`${styles.three_img__img} ${styles.three_img__1}`}></div>
            <div className={`${styles.three_img__img} ${styles.three_img__2}`}></div>
            <div className={`${styles.three_img__img} ${styles.three_img__3}`}></div>
        </div>
    );
};

export default GallerySection;