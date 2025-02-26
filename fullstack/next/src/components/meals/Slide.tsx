"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/meals/SlideMeals.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeals, selectAllMeals, selectMealsStatus } from "@/store/slices/mealsSlice";
import type { AppDispatch } from "@/store";
import {filterColors} from '@/store/Constants';

const mealTypes = [
  {
    id: '1',
    type: 'desayuno',
    name: 'Empieza tu día con energía',
    title: 'Desayunos',
    price: '€ 39.90',
    description: 'Deliciosos desayunos nutritivos para comenzar el día con la mejor energía',
    subtitle: 'Variedad de opciones saludables para tu desayuno',
    productImage: '/assets/shop/meals/desayuno.png',
  },
  {
    id: '2',
    type: 'comida',
    name: 'Comidas completas y equilibradas',
    title: 'Comidas',
    price: '€ 35.90',
    description: 'Platos principales nutritivos y sabrosos para tu almuerzo diario',
    subtitle: 'Comidas caseras preparadas con ingredientes frescos',
    productImage: '/assets/shop/meals/comida.png',
  },
  {
    id: '3',
    type: 'merienda',
    name: 'Meriendas saludables y deliciosas',
    title: 'Meriendas',
    price: '€ 29.90',
    description: 'Opciones ligeras y nutritivas para tus meriendas de media tarde',
    subtitle: 'Snacks saludables para mantener tu energía',
    productImage: '/assets/shop/meals/merienda.png',
  },
  {
    id: '4',
    type: 'cena',
    name: 'Cenas ligeras y saludables',
    title: 'Cenas',
    price: '€ 34.90',
    description: 'Cenas equilibradas y fáciles de digerir para terminar bien el día',
    subtitle: 'Opciones ligeras para tu cena',
    productImage: '/assets/shop/meals/cena.png',
  },
  {
    id: '5',
    type: 'postre',
    name: 'Postres caseros y saludables',
    title: 'Postres',
    price: '€ 34.90',
    description: 'Deliciosos postres elaborados con ingredientes naturales y saludables',
    subtitle: 'Dulces momentos con menos calorías',
    productImage: '/assets/shop/meals/postre.png',
  }
];

// const filterColors = [
//   { id: 1, color: "#C1E1C1", name: "Desayunos" },
//   { id: 2, color: "#F0D5A8", name: "Comidas" },
//   { id: 3, color: "#E6C3C3", name: "Meriendas" },
//   { id: 4, color: "#D4E6E6", name: "Cenas" },
//   { id: 5, color: "#E8D1DC", name: "Postres" },
// ];

interface SlideProps {
  activeFilter: number | null;
  activeFilterColor: string;
  onFilterChange: (id: number, color: string) => void;
}

const Slide = ({ activeFilter, activeFilterColor, onFilterChange }: SlideProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const meals = useSelector(selectAllMeals);
  const status = useSelector(selectMealsStatus);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  const searchParams = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const isInitialRender = useRef(true);
  const isUrlChanging = useRef(false);
  const navigationInProgress = useRef(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
    
    if (status === 'succeeded' && meals.length > 0 && !dataLoaded) {
      // console.log("Datos de meals cargados correctamente:", meals);
      setDataLoaded(true);
    }
  }, [dispatch, status, meals, dataLoaded]);

  useEffect(() => {
    const queryFilter = searchParams.get("type_meal");
    
    if (isInitialRender.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= mealTypes.length) {
          const newIndex = filterId - 1;
          setActiveSlide(newIndex);
        }
      }
      isInitialRender.current = false;
    } else if (!isUrlChanging.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= mealTypes.length) {
          const newIndex = filterId - 1;
          if (newIndex !== activeSlide) {
            setActiveSlide(newIndex);
          }
        }
      }
    }
  }, [searchParams, activeSlide, mealTypes.length]);


  const handleSlideChange = useCallback((newIndex: number) => {
    if (newIndex !== activeSlide && !navigationInProgress.current) {
      navigationInProgress.current = true;
      setFadeState('out');
      
      setTimeout(() => {
        setActiveSlide(newIndex);
        
        const mealType = mealTypes[newIndex];
        if (mealType) {
          const newFilterId = parseInt(mealType.id, 10);
          const newFilterColor = filterColors.find(f => f.id === newFilterId)?.color || "#FFFFFF";
          if (activeFilter !== newFilterId || activeFilterColor !== newFilterColor) {
            onFilterChange(newFilterId, newFilterColor);
          }
          const currentFilter = searchParams.get("type_meal");
          if (currentFilter !== newFilterId.toString()) {
            isUrlChanging.current = true;
            router.push(`?type_meal=${newFilterId}`, { scroll: false });
            
            setTimeout(() => {
              isUrlChanging.current = false;
            }, 150);
          }
          
          setFadeState('in');
        }
        setTimeout(() => {
          navigationInProgress.current = false;
        }, 200);
      }, 150);
    }
  }, [activeSlide, activeFilter, activeFilterColor, onFilterChange, router, mealTypes, searchParams]);

  const goToNextSlide = () => {
    const newIndex = activeSlide < mealTypes.length - 1 ? activeSlide + 1 : 0;
    handleSlideChange(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = activeSlide > 0 ? activeSlide - 1 : mealTypes.length - 1;
    handleSlideChange(newIndex);
  };

  const mealCounts = {};
  meals.forEach(meal => {
    if (meal.type_meal && Array.isArray(meal.type_meal)) {
      meal.type_meal.forEach(type => {
        if (!mealCounts[type]) {
          mealCounts[type] = 0;
        }
        mealCounts[type]++;
      });
    }
  });

  // Si aún estamos cargando, mostrar un mensaje o un componente de carga
  if (status === 'loading') {
    return <div className={styles.loadingContainer}>Cargando menús...</div>;
  }

  const currentMealType = mealTypes[activeSlide];

  return (
    <div className={styles.container} style={{ backgroundColor: activeFilterColor }}>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.mainWrapper}>
            <h3 className={styles.mainHeader}>{currentMealType.name}</h3>
            <h1 className={styles.mainTitle}>{currentMealType.title}</h1>
            <h2 className={styles.mainSubtitle}>
              {currentMealType.price}
              {mealCounts[currentMealType.type] > 0 && (
                <span className={styles.mealCount}>{mealCounts[currentMealType.type]} opciones disponibles</span>
              )}
            </h2>
          </div>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{currentMealType.description}</h3>
            <p className={styles.mainContentSubtitle}>{currentMealType.subtitle}</p>
          </div>

          <div className={styles.navigationControls}>
              <button 
                className={styles.navButton}
                onClick={goToPrevSlide}
              >
              <span className={styles.navIcon}>←</span>
            </button>
            <div className={styles.paginationDots}>
              {mealTypes.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
                  onClick={() => handleSlideChange(index)}
                ></span>
              ))}
            </div>
              <button 
                className={styles.navButton}
                onClick={goToNextSlide}
              >
              <span className={styles.navIcon}>→</span>
            </button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={`${styles.imageWrapper} ${styles['fade' + fadeState]}`}>
            <Image 
              className={styles.mealImage} 
              src={currentMealType.productImage} 
              alt={currentMealType.title}
              width={500}
              height={500}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;