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
import Image from "next/image";

interface Activity {
  id: string;
  name: string;
  title: string;
  description: string;
  subtitle: string;
  activityImage: string;
}

const filterColors = [
  { id: 1, color: "#FFE5D9", name: "Cuidados" },
  { id: 2, color: "#E3F4D7", name: "Exteriores" },
  { id: 3, color: "#FFE0E9", name: "Rehabilitaciónes" },
  { id: 4, color: "#E0F4FF", name: "Relajación" },
  { id: 5, color: "#E8E0FF", name: "Educación" },
];

const activities: Activity[] = [
  {
    id: "1",
    name: "Servicios de Cuidado Personal Premium",
    title: "Cuidados Personalizados",
    description: "Nuestro equipo de profesionales altamente capacitados brinda atención individualizada las 24 horas, incluyendo asistencia en higiene personal, control de medicamentos, y cuidados especializados adaptados a cada residente.",
    subtitle: "Cuidado integral con calidez humana y profesionalismo",
    activityImage: "assets/shop/activities/cuidados.png",
  },
  {
    id: "2",
    name: "Jardines Terapéuticos y Actividades al Aire Libre",
    title: "Espacios Verdes",
    description: "Disfruta de nuestros hermosos jardines diseñados especialmente para la terapia hortícola, paseos seguros y actividades recreativas. Contamos con áreas de descanso sombreadas y huertos terapéuticos donde los residentes pueden cultivar sus propias plantas.",
    subtitle: "Espacios naturales diseñados para tu bienestar y conexión con la naturaleza",
    activityImage: "assets/shop/activities/exterior.png",
  },
  {
    id: "3",
    name: "Centro de Rehabilitación Integral",
    title: "Rehabilitación Especializada",
    description: "Centro de rehabilitación de última generación con equipamiento moderno y terapeutas especializados. Ofrecemos programas personalizados de fisioterapia, terapia ocupacional y rehabilitación neurológica para mantener y mejorar la autonomía de nuestros residentes.",
    subtitle: "Recuperación y mantenimiento físico con los mejores especialistas",
    activityImage: "assets/shop/activities/rehabilitacion.png",
  },
  {
    id: "4",
    name: "Espacios de Bienestar y Relajación",
    title: "Área de Relajación",
    description: "Sala de relajación multisensorial con aromaterapia, musicoterapia y cromoterapia. Ofrecemos sesiones de yoga suave, meditación guiada y masajes terapéuticos en un ambiente tranquilo y acogedor diseñado para reducir el estrés y mejorar el bienestar emocional.",
    subtitle: "Experiencias sensoriales para la paz mental y el equilibrio emocional",
    activityImage: "assets/shop/activities/relajacion.png",
  },
  {
    id: "5",
    name: "Academia Vital - Programas Educativos y Culturales",
    title: "Educación Continua",
    description: "Centro de aprendizaje dinámico con talleres de memoria, clases de arte, música y tecnología. Organizamos conferencias culturales, clubes de lectura y actividades intergeneracionales para mantener la mente activa y fomentar la socialización entre residentes.",
    subtitle: "Aprendizaje continuo y estimulación cognitiva en comunidad",
    activityImage: "assets/shop/activities/educacion.png",
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
  const swiperRef = useRef<SwiperType | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryFilter = searchParams.get("type_activity");
    if (queryFilter) {
      const filterId = parseInt(queryFilter, 10);
      const filteredActivity = activities.find((activity) => parseInt(activity.id) === filterId);
      if (filteredActivity) {
        const newIndex = activities.indexOf(filteredActivity);
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

    const newFilter = activities[newIndex];
    if (newFilter) {
      const newFilterId = parseInt(newFilter.id, 10);
      const newFilterColor = filterColors.find(f => f.id === newFilterId)?.color || "#FFFFFF";
      
      if (activeFilter !== newFilterId || activeFilterColor !== newFilterColor) {
        onFilterChange(newFilterId, newFilterColor);
        document.body.setAttribute('data-sld', (newFilterId - 1).toString());
        router.push(`?activity_type=${newFilterId}`, { scroll: false });
      }
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: activeFilterColor }}>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.mainWrapper}>
            <h3 className={styles.mainHeader}>{activities[activeSlide].name}</h3>
            <h1 className={styles.mainTitle}>{activities[activeSlide].title}</h1>
          </div>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{activities[activeSlide].description}</h3>
            <p className={styles.mainContentSubtitle}>{activities[activeSlide].subtitle}</p>
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
        >
          {activities.map((activity, index) => (
            <SwiperSlide key={activity.id}>
              <div className={styles.center}>
                {index === activeSlide && (
                  <Image className={styles.bottleImg} src={activity.activityImage} alt={activity.title} width={500} height={500} />
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