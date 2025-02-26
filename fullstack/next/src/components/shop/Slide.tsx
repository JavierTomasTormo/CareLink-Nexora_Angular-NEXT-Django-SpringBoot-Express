"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/shop/SlideActivities.module.css";
import { filterColorsShop } from "@/store/Constants";

interface Activity {
  id: string;
  type: string;
  name: string;
  title: string;
  price: string;
  description: string;
  subtitle: string;
  activityImage: string;
}

const activities: Activity[] = [
  {
    id: "1",
    name: "Servicios de Cuidado Personal Premium",
    title: "Cuidados Personalizados",
    description: "Nuestro equipo de profesionales altamente capacitados brinda atención individualizada las 24 horas, incluyendo asistencia en higiene personal, control de medicamentos, y cuidados especializados adaptados a cada residente.",
    subtitle: "Cuidado integral con calidez humana y profesionalismo",
    activityImage: "/assets/shop/activities/cuidados.png",
  },
  {
    id: "2",
    name: "Jardines Terapéuticos y Actividades al Aire Libre",
    title: "Espacios Verdes",
    description: "Disfruta de nuestros hermosos jardines diseñados especialmente para la terapia hortícola, paseos seguros y actividades recreativas. Contamos con áreas de descanso sombreadas y huertos terapéuticos donde los residentes pueden cultivar sus propias plantas.",
    subtitle: "Espacios naturales diseñados para tu bienestar y conexión con la naturaleza",
    activityImage: "/assets/shop/activities/exterior.png",
  },
  {
    id: "3",
    name: "Centro de Rehabilitación Integral",
    title: "Rehabilitación Especializada",
    description: "Centro de rehabilitación de última generación con equipamiento moderno y terapeutas especializados. Ofrecemos programas personalizados de fisioterapia, terapia ocupacional y rehabilitación neurológica para mantener y mejorar la autonomía de nuestros residentes.",
    subtitle: "Recuperación y mantenimiento físico con los mejores especialistas",
    activityImage: "/assets/shop/activities/rehabilitacion.png",
  },
  {
    id: "4",
    name: "Espacios de Bienestar y Relajación",
    title: "Área de Relajación",
    description: "Sala de relajación multisensorial con aromaterapia, musicoterapia y cromoterapia. Ofrecemos sesiones de yoga suave, meditación guiada y masajes terapéuticos en un ambiente tranquilo y acogedor diseñado para reducir el estrés y mejorar el bienestar emocional.",
    subtitle: "Experiencias sensoriales para la paz mental y el equilibrio emocional",
    activityImage: "/assets/shop/activities/relajacion.png",
  },
  {
    id: "5",
    name: "Academia Vital - Programas Educativos y Culturales",
    title: "Educación Continua",
    description: "Centro de aprendizaje dinámico con talleres de memoria, clases de arte, música y tecnología. Organizamos conferencias culturales, clubes de lectura y actividades intergeneracionales para mantener la mente activa y fomentar la socialización entre residentes.",
    subtitle: "Aprendizaje continuo y estimulación cognitiva en comunidad",
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);
  const isUrlChanging = useRef(false);
  const navigationInProgress = useRef(false);

  useEffect(() => {
    const queryFilter = searchParams.get("activity_type");
    if (isInitialRender.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= activities.length) {
          const newIndex = filterId - 1;
          setActiveSlide(newIndex);
        }
      }
      isInitialRender.current = false;
    } else if (!isUrlChanging.current) {
      if (queryFilter) {
        const filterId = parseInt(queryFilter, 10);
        if (filterId >= 1 && filterId <= activities.length) {
          const newIndex = filterId - 1;
          if (newIndex !== activeSlide) {
            setActiveSlide(newIndex);
          }
        }
      }
    }
  }, [searchParams, activeSlide]);

  const handleSlideChange = useCallback((newIndex: number) => {
    if (newIndex !== activeSlide && !navigationInProgress.current) {
      navigationInProgress.current = true;
      setFadeState('out');
      setTimeout(() => {
        setActiveSlide(newIndex);
        const activity = activities[newIndex];
        if (activity) {
          const newFilterId = parseInt(activity.id, 10);
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
        }, 200);
      }, 150);
    }
  }, [activeSlide, activeFilter, activeFilterColor, onFilterChange, router, searchParams]);

  const goToNextSlide = () => {
    const newIndex = activeSlide < activities.length - 1 ? activeSlide + 1 : 0;
    handleSlideChange(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = activeSlide > 0 ? activeSlide - 1 : activities.length - 1;
    handleSlideChange(newIndex);
  };

  const currentActivity = activities[activeSlide];


  return (
    <div className={styles.container} style={{ backgroundColor: activeFilterColor }}>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.mainWrapper}>
            <h3 className={styles.mainHeader}>{currentActivity.name}</h3>
            <h1 className={styles.mainTitle}>{currentActivity.title}</h1>
            <h2 className={styles.mainSubtitle}>{currentActivity.price}</h2>
          </div>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{currentActivity.description}</h3>
            <p className={styles.mainContentSubtitle}>{currentActivity.subtitle}</p>
          </div>

          <div className={styles.navigationControls}>
            <button 
              className={styles.navButton}
              onClick={goToPrevSlide}
            >
              <span className={styles.navIcon}>←</span>
            </button>
            <div className={styles.paginationDots}>
              {activities.map((_, index) => (
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
              className={styles.bottleImg} 
              src={currentActivity.activityImage} 
              alt={currentActivity.title} 
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;