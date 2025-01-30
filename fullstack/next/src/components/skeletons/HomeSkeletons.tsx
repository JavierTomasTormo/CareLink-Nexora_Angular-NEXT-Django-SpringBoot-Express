import React from 'react';
import styles from '@/styles/skeletons/HomeSkeletons.module.css';

export const BannerSkeleton = () => (
    <div className={styles.bannerWrapper}>
        <div className={styles.bannerSkeleton}>
        <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
                <div className={styles.bannerTitle}></div>
                <div className={styles.bannerText}></div>
                <div className={styles.bannerButton}></div>
            </div>
        </div>
        </div>
    </div>
);


export const BestRoomsSkeleton = () => (
    <div className={styles.bestRoomsWrapper}>
        <div className={styles.bestRoomsContent}>
            <div className={styles.bestRoomsTitle}></div>
                <div className={styles.featuresGrid}>
                {[1, 2, 3].map((item) => (
                    <div key={item} className={styles.featureItem}>
                    <div className={styles.featureIcon}></div>
                    <div className={styles.featureTitle}></div>
                    </div>
                ))}
                </div>
            <div className={styles.bestRoomsText}></div>
            <div className={styles.bestRoomsButton}></div>
        </div>
    </div>
);