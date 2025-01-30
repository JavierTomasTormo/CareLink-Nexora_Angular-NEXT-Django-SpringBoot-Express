'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/home/Banner/BannerSection.module.css';
import { BannerSkeleton } from '@/components/skeletons/HomeSkeletons';

const BannerSection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <BannerSkeleton />;
    }

    return (
        <div className={styles.banner}>
            <div className={styles.banner__overlay}>
                <div className={styles.banner__container}>
                    <h1 className={styles.banner__title}>VitalNest</h1>
                    <p className={styles.banner__text}>Cuidamos con compromiso, protegemos con innovacion</p>
                    <a href="#" className={`${styles.btn} ${styles.btn__opacity}`}>Register Now</a>
                </div>
                <img 
                    className={styles.banner__scroll_down} 
                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Im0xMjEuMywzNC42Yy0xLjYtMS42LTQuMi0xLjYtNS44LDBsLTUxLDUxLjEtNTEuMS01MS4xYy0xLjYtMS42LTQuMi0xLjYtNS44LDAtMS42LDEuNi0xLjYsNC4yIDAsNS44bDUzLjksNTMuOWMwLjgsMC44IDEuOCwxLjIgMi45LDEuMiAxLDAgMi4xLTAuNCAyLjktMS4ybDUzLjktNTMuOWMxLjctMS42IDEuNy00LjIgMC4xLTUuOHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+Cjwvc3ZnPgo=" 
                    alt="Scroll Down"
                />
            </div>
        </div>
    );
};

export default BannerSection;

// 'use client';

// import styles from '@/styles/home/Banner/BannerSection.module.css';

// const BannerSection = () => {
//     return (
//         <div className={styles.banner}>
//             <div className={styles.banner__overlay}>
//                 <div className={styles.banner__container}>
//                 <h1 className={styles.banner__title}>VitalNest</h1>
//                 <p className={styles.banner__text}>Cuidamos con compromiso, protegemos con innovacion</p>
//                 <a href="#" className={`${styles.btn} ${styles.btn__opacity}`}>Register Now</a>
//                 </div>
//                 <img 
//                 className={styles.banner__scroll_down} 
//                 src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Im0xMjEuMywzNC42Yy0xLjYtMS42LTQuMi0xLjYtNS44LDBsLTUxLDUxLjEtNTEuMS01MS4xYy0xLjYtMS42LTQuMi0xLjYtNS44LDAtMS42LDEuNi0xLjYsNC4yIDAsNS44bDUzLjksNTMuOWMwLjgsMC44IDEuOCwxLjIgMi45LDEuMiAxLDAgMi4xLTAuNCAyLjktMS4ybDUzLjktNTMuOWMxLjctMS42IDEuNy00LjIgMC4xLTUuOHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+Cjwvc3ZnPgo=" 
//                 alt="Scroll Down"
//                 />
//             </div> 
//         </div>
//     );
// };


// export default BannerSection;