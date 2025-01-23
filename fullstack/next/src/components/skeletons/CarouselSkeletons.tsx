    import React from 'react';
    import styles from '@/styles/skeletons/CarouselSkeletons.module.css';

    export const CarouselPrincipalSkeleton = () => (
    <div className={styles.skeletonWrapper}>
        <div className={styles.heroSkeleton}>
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.contentPlaceholder}>
            <div className={styles.titlePlaceholder}></div>
            <div className={styles.textPlaceholder}></div>
        </div>
        </div>
    </div>
    );

    export const CarouselFloatingSkeleton = () => (
    <div className={styles.floatingWrapper}>
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.indicators}>
        {[1, 2, 3].map((i) => (
            <div key={i} className={styles.dot}></div>
        ))}
        </div>
    </div>
    );

    export const CarouselSecundarioSkeleton = () => (
    <div className={styles.secundarioWrapper}>
        <div className={styles.titlePlaceholder}></div>
        <div className={styles.cardsGrid}>
        {[1, 2].map((i) => (
            <div key={i} className={styles.cardSkeleton}>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.textPlaceholder}></div>
            <div className={styles.textPlaceholder}></div>
            </div>
        ))}
        </div>
    </div>
    );

    export const EmblaCarouselSkeleton = () => (
    <div className={styles.emblaWrapper}>
        <div className={styles.emblaSlide}>
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.controls}>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
        </div>
        </div>
        <div className={styles.dots}>
        {[1, 2, 3].map((i) => (
            <div key={i} className={styles.dot}></div>
        ))}
        </div>
    </div>
    );

    export const ServicesApplicationSkeleton = () => (
    <div className={styles.servicesWrapper}>
        <div className={styles.iconsGrid}>
        {[1, 2, 3].map((i) => (
            <div key={i} className={styles.iconSkeleton}>
            <div className={styles.iconPlaceholder}></div>
            <div className={styles.textPlaceholder}></div>
            </div>
        ))}
        </div>
        <div className={styles.contentSkeleton}>
        <div className={styles.textPlaceholder}></div>
        <div className={styles.textPlaceholder}></div>
        <div className={styles.textPlaceholder}></div>
        </div>
    </div>
    );
