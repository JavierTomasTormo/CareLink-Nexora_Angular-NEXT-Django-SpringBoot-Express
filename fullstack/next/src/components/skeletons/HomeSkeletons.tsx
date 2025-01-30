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

export const BlogSkeleton = () => (
    <div className={styles.blogWrapper}>
        <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
                <div className={styles.blogTitle}></div>
                <div className={styles.blogSubtitle}></div>
            </div>
            <div className={styles.blogGrid}>
                {[1, 2, 3].map((item) => (
                    <div key={item} className={styles.blogCard}>
                        <div className={styles.blogImageSkeleton}></div>
                            <div className={styles.blogContent}>
                                <div className={styles.blogCardTitle}></div>
                                <div className={styles.blogCardDate}></div>
                                <div className={styles.blogCardText}></div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


export const FreshActivitiesSkeleton = () => (
    <div className={styles.freshWrapper}>
        <div className={styles.freshHalf}>
            <div className={styles.freshContent}>
                <div className={styles.freshTitle}></div>
                <div className={styles.freshText}></div>
                <div className={styles.freshText}></div>
                <div className={styles.freshButton}></div>
            </div>
        </div>
        <div className={styles.freshImage}></div>
    </div>
);


export const GallerySkeleton = () => (
    <div className={styles.galleryWrapper}>
        {[1, 2, 3].map((item) => (
            <div key={item} className={styles.galleryImageSkeleton}></div>
        ))}
    </div>
);

export const GreatMealsSkeleton = () => (
    <div className={styles.greatMealsWrapper}>
        <div className={styles.greatMealsContainer}>
            <div className={styles.greatMealsRow}>
                <div className={styles.greatMealsContent}>
                    <div className={styles.greatMealsTitle}></div>
                    <div className={styles.greatMealsText}></div>
                    <div className={styles.greatMealsText}></div>
                    <div className={styles.greatMealsButton}></div>
                </div>
            </div>
        </div>
    </div>
);


export const OurStorySkeleton = () => (
    <div className={styles.storyWrapper}>
        <div className={styles.storyBrown}>
            <div className={styles.storyContainer}>
                <div className={styles.storyCenter}>
                    <div className={styles.storyContent}>
                        <div className={styles.storyTitle}></div>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={styles.storyText}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.storyImageSkeleton}></div>
    </div>
);


export const TypesSkeleton = () => (
    <div className={styles.typesWrapper}>
        <div className={styles.typesContainer}>
            <div className={styles.typesHeader}>
                <div className={styles.typesTitle}></div>
                <div className={styles.typesSubtitle}></div>
            </div>
            <div className={styles.typesGrid}>
                {[1, 2, 3].map((item) => (
                    <div key={item} className={styles.typeCard}>
                    <div className={styles.typeImageSkeleton}></div>
                    <div className={styles.typeTitle}></div>
                    <div className={styles.typeDescription}></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);