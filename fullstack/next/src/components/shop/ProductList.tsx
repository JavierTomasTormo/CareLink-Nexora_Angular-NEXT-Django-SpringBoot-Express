// 'use client';

// import { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, EffectFade } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import styles from '@/styles/shop/SlideMeals.module.css';

// interface Product {
//     id: string;
//     name: string;
//     title: string;
//     price: string;
//     description: string;
//     subtitle: string;
//     bgImage: string;
//     productImage: string;
// }

// const products: Product[] = [
//   {
//     id: 'beach',
//     name: 'Beach',
//     title: 'Beach',
//     price: '€ 39.90',
//     description: 'In 20 years, there could be more plastic in our oceans than fish.',
//     subtitle: 'Plastic pollution injures more than 100,000 marine animals every year.',
//     bgImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2902&auto=format&fit=crop',
//     productImage: 'https://www.designforfinland.com/product-images/Closca_Bottle_Wave_Antarctica_450ml_Close.png/2083089000004207012/1100x1100',
//   },
//   {
//     id: 'savanna',
//     name: 'Savanna',
//     title: 'Savanna',
//     price: '€ 35.90',
//     description: 'Plastic pollution injures more than 100,000 marine animals every year.',
//     subtitle: 'Help protect wildlife and their habitats',
//     bgImage: 'https://images.unsplash.com/photo-1613109526778-27605f1f27d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
//     productImage: 'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Sahara_600ml_Close.png?v=1703675684',
//   },
//   {
//     id: 'glacier',
//     name: 'Glacier',
//     title: 'Glacier',
//     price: '€ 29.90',
//     description: 'A sustainable bottle for your everyday adventures.',
//     subtitle: 'Perfect for cold drinks and outdoor activities',
//     bgImage: 'https://media.istockphoto.com/id/930588118/es/foto/glaciar-de-glacier-bay-alaska.jpg?s=612x612&w=0&k=20&c=NwFSOk29EmOZ6R2xOdky-a6ZfTPOccCJTt1Gi-ALuBw=',
//     productImage: 'https://gomagcdn.ro/domains/alty.ro/files/product/original/sticla-reutilizabila-apa-closca-glacier-copie-848-7049.png',
//   },
//   {
//     id: 'desert',
//     name: 'Closca Bottle',
//     title: 'Desert',
//     price: '€ 34.90',
//     description: 'Help reduce the impact of single-use plastics.',
//     subtitle: 'Sustainable hydration for hot climates',
//     bgImage: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3260&q=80',
//     productImage: 'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Arizona_600ml_Close.png?v=1703675684&width=1946',
//   },];

// const ProductList = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   return (
//     <div className={styles.container}>
//         <header className={styles.header}>
//             <div className={styles.logo}>VitalNest</div>
//             <div className={styles.headerMenu}>
//                 <span className={styles.menuItem}>Products</span>
//                 <span className={styles.menuItem}>Story</span>
//                 <span className={styles.menuItem}>Manufacturing</span>
//                 <span className={styles.menuItem}>Packaging</span>
//             </div>
//         </header>

//         <div className={styles.main}>
//             <div className={styles.leftSide}>
//                 <div className={styles.mainWrapper}>
//                     <h3 className={styles.mainHeader}>{products[activeSlide].name}</h3>
//                     <h1 className={styles.mainTitle}>{products[activeSlide].title}</h1>
//                     <h2 className={styles.mainSubtitle}>{products[activeSlide].price}</h2>
//                 </div>
//                 <div className={styles.mainContent}>
//                     <h3 className={styles.mainContentTitle}>{products[activeSlide].description}</h3>
//                     <p className={styles.mainContentSubtitle}>{products[activeSlide].subtitle}</p>
//                 </div>
//             </div>

// <Swiper
//   modules={[Navigation, Pagination, EffectFade]}
//   effect="fade"
//   loop={true}
//   speed={600}
//   onSlideChange={(swiper) => {
//     setActiveSlide(swiper.realIndex);
//   }}
//   className={styles.mySwiper}
// >
//   {products.map((product) => (
//     <SwiperSlide key={product.id}>
//       <div className={styles.center}>
//         <img 
//           className={styles.bottleBg}
//           src={product.bgImage}
//           alt=""
//         />
//         <img 
//           className={`${styles.bottleImg} ${activeSlide !== products.indexOf(product) ? styles.hidden : ''}`}
//           src={product.productImage}
//           alt={product.title}
//         />
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>

//             <div className={styles.buttonWrapper}>
//                 <button className={`${styles.swiperButton} ${styles.swiperPrevButton}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M15 18l-6-6 6-6"/>
//                     </svg>
//                 </button>
//                 <button className={`${styles.swiperButton} ${styles.swiperNextButton}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M9 18l6-6-6-6"/>
//                     </svg>
//                 </button>
//             </div>
//             <div className={styles.swiperPagination}></div>
//         </div>
//     </div>
// );
// };

// export default ProductList;
