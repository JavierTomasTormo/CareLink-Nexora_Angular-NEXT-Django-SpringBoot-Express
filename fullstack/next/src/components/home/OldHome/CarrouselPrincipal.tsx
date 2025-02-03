// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Provider } from 'react-redux';
// import store from '@/store';
// import SkeletonLoader from '@/utils/SkeletonLoader';
// import styles from '../../styles/home/CarrouselPrincipal.module.css';
// import CarrouselFloating from './OldHome/CarrouselFloating';
// import { CarouselPrincipalSkeleton } from '@/components/skeletons/CarouselSkeletons';
// import TestStores from './TestStores';

// const CarrouselPrincipalContent: React.FC = () => {
//   const slides = [
//     '/assets/home/carrouselPrincipal/carrousel1.jpg',
//     '/assets/home/carrouselPrincipal/carrousel1.jpg',
//     '/assets/home/carrouselPrincipal/carrousel1.jpg',
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadImages = () => setTimeout(() => setIsLoading(false), 2000);
//     loadImages();

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return <CarouselPrincipalSkeleton />;
//   }

//   return (
//     <Provider store={store}>
//       <div className={styles.container}>
//         <div className={styles.carrousel}>
//           {isLoading ? (
//             <SkeletonLoader type="image" count={1} className={styles.skeletonImage} />
//           ) : (
//             <div
//               className={styles.slides}
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {slides.map((slide, index) => (
//                 <div key={index} className={styles.slide}>
//                   <img src={slide} alt={`Slide ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className={styles.floatingContent}>
//             <div className={styles.contentWrapper}>
//               {isLoading ? (
//                 <SkeletonLoader type="text" count={3} />
//               ) : (
//                 <>
//                   <div className={styles.textContent}>
//                     <h1 className={styles.title}>Vital Nest</h1>
//                     <p className={styles.subtitle}>
//                       Especializados en cuidados, brindamos el mejor entorno para cuidar de las personas que amas.
//                     </p>
//                   </div>
//                   <div className={styles.imageContent}>
//                     <CarrouselFloating />
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className={styles.indicators}>
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
//                 onClick={() => setCurrentIndex(index)}
//               />
//             ))}
//           </div>
//         </div>
//         <TestStores />
//       </div>
//     </Provider>
//   );
// };

// const CarrouselPrincipal: React.FC = () => (
//   <Provider store={store}>
//     <CarrouselPrincipalContent />
//   </Provider>
// );

// export default CarrouselPrincipal;
