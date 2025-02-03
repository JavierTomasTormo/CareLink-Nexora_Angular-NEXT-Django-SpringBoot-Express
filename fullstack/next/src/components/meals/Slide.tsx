"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "@/styles/meals/SlideMeals.module.css";
import { Swiper as SwiperType } from "swiper";


interface Product {
  id: string;
  name: string;
  title: string;
  price: string;
  description: string;
  subtitle: string;
  productImage: string;
}

const filterColors = [
  { id: 1, color: "#C1E1C1", name: "Desayunos" },
  { id: 2, color: "#F0D5A8", name: "Comidas" },
  { id: 3, color: "#E6C3C3", name: "Meriendas" },
  { id: 4, color: "#D4E6E6", name: "Cenas" },
  { id: 5, color: "#E8D1DC", name: "Postres" },
];

const products: Product[] = [
  {
    id: '1',
    name: 'Empieza tu día con energía',
    title: 'Desayunos',
    price: '€ 39.90',
    description: 'Deliciosos desayunos nutritivos para comenzar el día con la mejor energía',
    subtitle: 'Variedad de opciones saludables para tu desayuno',
    productImage: 'assets/shop/meals/desayuno.png',
  },
  {
    id: '2',
    name: 'Comidas completas y equilibradas',
    title: 'Comidas',
    price: '€ 35.90',
    description: 'Platos principales nutritivos y sabrosos para tu almuerzo diario',
    subtitle: 'Comidas caseras preparadas con ingredientes frescos',
    productImage: 'assets/shop/meals/comida.png',
  },
  {
    id: '3',
    name: 'Meriendas saludables y deliciosas',
    title: 'Meriendas',
    price: '€ 29.90',
    description: 'Opciones ligeras y nutritivas para tus meriendas de media tarde',
    subtitle: 'Snacks saludables para mantener tu energía',
    productImage: 'assets/shop/meals/merienda.png',
  },
  {
    id: '4',
    name: 'Cenas ligeras y saludables',
    title: 'Cenas',
    price: '€ 34.90',
    description: 'Cenas equilibradas y fáciles de digerir para terminar bien el día',
    subtitle: 'Opciones ligeras para tu cena',
    productImage: 'assets/shop/meals/cena.png',
  },
  {
    id: '5',
    name: 'Postres caseros y saludables',
    title: 'Postres',
    price: '€ 34.90',
    description: 'Deliciosos postres elaborados con ingredientes naturales y saludables',
    subtitle: 'Dulces momentos con menos calorías',
    productImage: 'assets/shop/meals/postre.png',
  }
];

interface SlideProps {
  activeFilter: number | null;
  activeFilterColor: string;
}

const Slide = ({ activeFilter, activeFilterColor, onFilterChange }: SlideProps & { onFilterChange: (id: number, color: string) => void }) => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryFilter = searchParams.get("type_meal");
    if (queryFilter) {
      const filterId = parseInt(queryFilter, 10);
      const filteredProduct = products.find((product) => parseInt(product.id) === filterId);
      if (filteredProduct) {
        const newIndex = products.indexOf(filteredProduct);
        setActiveSlide(newIndex);
        if (swiperRef.current) {
          swiperRef.current.slideTo(newIndex);
        }
      }
    }
  }, [searchParams]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    setActiveSlide(newIndex);

    const newFilter = products[newIndex];
    if (newFilter) {
      const newFilterId = parseInt(newFilter.id, 10);
      const newFilterColor = filterColors.find(f => f.id === newFilterId)?.color || "#FFFFFF";
      
      if (activeFilter !== newFilterId || activeFilterColor !== newFilterColor) {
        onFilterChange(newFilterId, newFilterColor);
      }
      
      router.push(`?type_meal=${newFilterId}`, { scroll: false });
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: activeFilterColor }}>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.mainWrapper}>
            <h3 className={styles.mainHeader}>{products[activeSlide].name}</h3>
            <h1 className={styles.mainTitle}>{products[activeSlide].title}</h1>
            <h2 className={styles.mainSubtitle}>{products[activeSlide].price}</h2>
          </div>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{products[activeSlide].description}</h3>
            <p className={styles.mainContentSubtitle}>{products[activeSlide].subtitle}</p>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, EffectFade]}
          effect="fade"
          loop={false}
          speed={600}
          onSlideChange={handleSlideChange}
          className={styles.mySwiper}
          initialSlide={activeFilter ? activeFilter - 1 : 0}
          allowSlideNext={activeSlide < products.length - 1}
          allowSlidePrev={activeSlide > 0}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className={styles.center}>
                {index === activeSlide && (
                  <>
                    <img className={styles.bottleImg} src={product.productImage} alt={product.title} />
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;