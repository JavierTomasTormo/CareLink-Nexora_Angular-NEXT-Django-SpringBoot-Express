'use client';

import styles from '@/styles/home/GallerySection/GallerySection.module.css';

const GallerySection = () => {
    return (
        <div className={styles.three_img}>
            <div className={`${styles.three_img__img} ${styles.three_img__1}`}></div>
            <div className={`${styles.three_img__img} ${styles.three_img__2}`}></div>
            <div className={`${styles.three_img__img} ${styles.three_img__3}`}></div>
        </div>
    );
};

export default GallerySection;