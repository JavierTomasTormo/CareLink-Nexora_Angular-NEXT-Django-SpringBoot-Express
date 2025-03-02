"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styles from "@/styles/shop/SlideActivities.module.css";
import { filterColorsShop } from "@/store/Constants";
import { fetchActivities, selectAllActivities, selectActivitiesStatus } from "@/store/slices/activitiesSlice";
import type { AppDispatch } from "@/store";

// Mantener las actividades principales para el carrusel
const activityTypes = [
  {
    id: "1",
    type: 'cuidado',
    name: "Servicios de Cuidado Personal",
    title: "Cuidados Personalizados",
    description: "Atención profesional 24/7 con asistencia personalizada en higiene, medicación y cuidados especializados para cada residente.",
    subtitle: "Cuidado integral con profesionalismo",
    activityImage: "/assets/shop/activities/cuidados.png",
  },
  {
    id: "2",
    type: 'exterior',
    name: "Jardines Terapéuticos",
    title: "Espacios Verdes",
    description: "Jardines diseñados para terapia hortícola y actividades recreativas, con áreas de descanso y huertos terapéuticos para nuestros residentes.",
    subtitle: "Espacios naturales para tu bienestar",
    activityImage: "/assets/shop/activities/exterior.png",
  },
  {
    id: "3",
    type: 'rehabilitacion',
    name: "Centro de Rehabilitación",
    title: "Rehabilitación Especializada",
    description: "Equipamiento moderno y terapeutas especializados ofreciendo programas personalizados de fisioterapia y rehabilitación neurológica.",
    subtitle: "Recuperación física profesional",
    activityImage: "/assets/shop/activities/rehabilitacion.png",
  },
  {
    id: "4",
    type: 'relajacion',
    name: "Espacios de Bienestar",
    title: "Área de Relajación",
    description: "Sala multisensorial con aromaterapia, musicoterapia y sesiones de yoga y meditación en un ambiente tranquilo y acogedor.",
    subtitle: "Experiencias para el bienestar emocional",
    activityImage: "/assets/shop/activities/relajacion.png",
  },
  {
    id: "5",
    type: 'educacion',
    name: "Academia Vital",
    title: "Educación Continua",
    description: "Talleres de memoria, arte, música y tecnología con actividades intergeneracionales y clubes de lectura para mantener la mente activa.",
    subtitle: "Aprendizaje y estimulación cognitiva",
    activityImage: "/assets/shop/activities/educacion.png",
  },
];

interface SlideProps {
  activeFilter: number | null;
  activeFilterColor: string;
  onFilterChange: (id: number, color: string) => void;
}

const Slide = ({ activeFilter, activeFilterColor, onFilterChange }: SlideProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  const searchParams = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const isInitialRender = useRef(true);
  const isUrlChanging = useRef(false);
  const navigationInProgress = useRef(false);

  // Cargar datos de actividades
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
    
    if (status === 'succeeded' && activities.length > 0 && !dataLoaded) {
      setDataLoaded(true);
    }
  }, [dispatch, status, activities, dataLoaded]);

  // Sincronizar con URL
  useEffect(() => {
    const queryFilter = searchParams.get("activity_type");
    if (isInitialRender.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= activityTypes.length) {
          const newIndex = filterId - 1;
          setActiveSlide(newIndex);
        }
      }
      isInitialRender.current = false;
    } else if (!isUrlChanging.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= activityTypes.length) {
          const newIndex = filterId - 1;
          if (newIndex !== activeSlide) {
            setActiveSlide(newIndex);
          }
        }
      }
    }
  }, [searchParams, activeSlide]);

  // Manejar cambio de slide con animación mejorada
  const handleSlideChange = useCallback((newIndex: number) => {
    if (newIndex !== activeSlide && !navigationInProgress.current) {
      navigationInProgress.current = true;
      setFadeState('out');
      
      setTimeout(() => {
        setActiveSlide(newIndex);
        
        const activityType = activityTypes[newIndex];
        if (activityType) {
          const newFilterId = parseInt(activityType.id, 10);
          const newFilterColor = filterColorsShop.find(f => f.id === newFilterId)?.color || "#FFFFFF";
          
          if (activeFilter !== newFilterId || activeFilterColor !== newFilterColor) {
            onFilterChange(newFilterId, newFilterColor);
          }
          
          const currentFilter = searchParams.get("activity_type");
          if (currentFilter !== newFilterId.toString()) {
            isUrlChanging.current = true;
            router.push(`?activity_type=${newFilterId}`, { scroll: false });
            
            setTimeout(() => {
              isUrlChanging.current = false;
            }, 150);
          }
          
          setFadeState('in');
        }
        
        setTimeout(() => {
          navigationInProgress.current = false;
        }, 250);
      }, 200);
    }
  }, [activeSlide, activeFilter, activeFilterColor, onFilterChange, router, searchParams]);

  // Navegación con botones
  const goToNextSlide = () => {
    const newIndex = activeSlide < activityTypes.length - 1 ? activeSlide + 1 : 0;
    handleSlideChange(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = activeSlide > 0 ? activeSlide - 1 : activityTypes.length - 1;
    handleSlideChange(newIndex);
  };

  // Contar actividades por tipo
  const activityCounts = {};
  activities.forEach(activity => {
    if (activity.activity_type) {
      const type = activity.activity_type;
      if (!activityCounts[type]) {
        activityCounts[type] = 0;
      }
      activityCounts[type]++;
    }
  });

  // Mostrar pantalla de carga
  if (status === 'loading') {
    return <div className={styles.loadingContainer}>Cargando actividades...</div>;
  }

  const currentActivityType = activityTypes[activeSlide];
  const activityType = parseInt(currentActivityType.id, 10);

  return (
    <div className={styles.container} style={{ 
      backgroundColor: activeFilterColor,
      backgroundImage: `url("/assets/shop/patterns/${currentActivityType.type}-pattern.png")`,
      backgroundSize: '220px',
      backgroundBlendMode: 'soft-light'
    }}>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.mainWrapper}>
            <h3 className={styles.mainHeader}>{currentActivityType.name}</h3>
            <h1 className={styles.mainTitle}>{currentActivityType.title}</h1>
            <h2 className={styles.mainSubtitle}>
              {activityCounts[activityType] > 0 && (
                <span className={styles.activityCount}>
                  {activityCounts[activityType]} actividades disponibles
                </span>
              )}
            </h2>
          </div>
          
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{currentActivityType.description}</h3>
            <p className={styles.mainContentSubtitle}>{currentActivityType.subtitle}</p>
            
            <button 
              className={styles.exploreButton} 
              onClick={() => router.push(`?activity_type=${currentActivityType.id}#activities`)}
            >
              Explorar Actividades
              <span className={styles.buttonArrow}>→</span>
            </button>
          </div>

          <div className={styles.navigationControls}>
            <button 
              className={styles.navButton}
              onClick={goToPrevSlide}
              aria-label="Actividad anterior"
            >
              <span className={styles.navIcon}>←</span>
            </button>
            
            <div className={styles.paginationDots}>
              {activityTypes.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Ir a ${activityTypes[index].title}`}
                  role="button"
                  tabIndex={0}
                ></span>
              ))}
            </div>
            
            <button 
              className={styles.navButton}
              onClick={goToNextSlide}
              aria-label="Siguiente actividad"
            >
              <span className={styles.navIcon}>→</span>
            </button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={`${styles.imageWrapper} ${styles['fade' + fadeState]}`}>
            <Image 
              className={styles.bottleImg} 
              src={currentActivityType.activityImage} 
              alt={currentActivityType.title} 
              width={600}
              height={600}
              priority
              quality={100}
            />
          </div>
          
          <div className={styles.decorativeElement}></div>
        </div>
      </div>
    </div>
  );
};

export default Slide;