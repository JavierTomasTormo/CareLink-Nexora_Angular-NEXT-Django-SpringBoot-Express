'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchActivity, selectActivitiesStatus, selectActivitiesError } from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '@/styles/details/ActivityDetails.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { FaWheelchair, FaSignLanguage, FaAccessibleIcon, FaParking, FaHeart, FaUsers } from 'react-icons/fa';
import { MdOutlineLocalHospital, MdSportsGymnastics, MdWaterDrop } from 'react-icons/md';

const ActivityDetailsClient: React.FC<{ activityId: string }> = ({ activityId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const activity = useSelector((state: RootState) => state.activities.activities.find(a => a.id === parseInt(activityId)));
    const status = useSelector(selectActivitiesStatus);
    const error = useSelector(selectActivitiesError);
    const isLoggedIn = isAuthenticated();

    const healthMetrics = {
        beneficiosSalud: 85,
        nivelEnergia: 90,
        mejoraPostura: 75,
        reduccionEstres: 88,
    };

    const comentariosFijos = [
        {
            usuario: "María García",
            avatar: "https://fastly.picsum.photos/id/235/200/200.jpg?hmac=YnNmt_uSm-7R-s3j5I_di0aCpJqnfzRzeAzZCV-SS4w",
            comentario: "¡Excelente actividad! Me ha ayudado mucho con mi flexibilidad.",
            fecha: "2023-11-15",
            valoracion: 5
        },
        {
            usuario: "Juan Pérez",
            avatar: "https://fastly.picsum.photos/id/84/200/200.jpg?hmac=6H-uafgNQmg74KSd7tSKVP1PWLigkAnXdB_PyFgxXNA",
            comentario: "Los instructores son muy profesionales y atentos.",
            fecha: "2023-11-14",
            valoracion: 4
        },
        {
            usuario: "Ana Martínez",
            avatar: "https://fastly.picsum.photos/id/37/200/200.jpg?hmac=iQLD6vXJYds0UdYxW9UhbkVxORZeEckKL-FVeaMfwF0",
            comentario: "Recomiendo esta actividad para principiantes.",
            fecha: "2023-11-13",
            valoracion: 5
        }
    ];

    const blogEntries = [
        {
            titulo: "Beneficios de esta actividad para tu salud mental",
            autor: "Dr. Roberto Sánchez",
            fecha: "2023-11-10",
            resumen: "Descubre cómo esta actividad puede mejorar tu bienestar mental y reducir el estrés...",
            imagen: "/assets/shop/activities/salud-mental.jpg"
        },
        {
            titulo: "5 consejos para maximizar los resultados",
            autor: "Laura Martín",
            fecha: "2023-11-08",
            resumen: "Aprende las mejores técnicas para aprovechar al máximo esta actividad...",
            imagen: "/assets/shop/activities/5-consejos.jpg"
        }
    ];

    // Effects
    useEffect(() => {
        if (!activity) {
            dispatch(fetchActivity(parseInt(activityId)));
        }
    }, [activityId, dispatch, activity]);

    // Event Handlers
    const handleInscription = () => {
        if (!isLoggedIn) {
            router.push('http://localhost:4200/auth/login');
        } else {
            router.push(`/inscriptions/${activityId}`);
        }
    };

    // Loading State
    if (status === 'loading') {
        return (
            <div className={styles.loaderContainer}>
                <SkeletonLoader type="card" count={1} />
            </div>
        );
    }

    // Error State
    if (status === 'failed') {
        return (
            <div className={`${styles.activityContainer} ${styles.errorContainer}`}>
                <div className={styles.errorContent}>
                    <h2 className={styles.errorTitle}>¡Ups! Algo salió mal</h2>
                    <p className={styles.errorMessage}>{error || 'No pudimos conectar con el servidor. Por favor, inténtalo de nuevo más tarde.'}</p>
                    <button 
                        className={styles.retryButton}
                        onClick={() => dispatch(fetchActivity(parseInt(activityId)))}
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    // Empty State
    if (!activity) {
        return (
            <div className={`${styles.activityContainer} ${styles.emptyContainer}`}>
                <div className={styles.emptyContent}>
                    <h2 className={styles.emptyTitle}>No hay información disponible</h2>
                    <p className={styles.emptyMessage}>Vuelve más tarde para descubrir más detalles sobre esta actividad.</p>
                </div>
            </div>
        );
    }

    // Main Content Render
    return (
        <div className={styles.activityDetails}>
            {/* Header Section */}
            <header className={styles.header}>
                <h1 className={styles.title}>{activity.name_activitie}</h1>
                <button className={styles.inscriptionButton} onClick={handleInscription}>
                    Inscribirse
                </button>
            </header>

            {/* Main Overview Section (Above the fold) */}
            <div className={styles.overviewSection}>
                {/* Left Side - Image Carousel */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        {activity.images && activity.images.length > 0 ? (
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                className={styles.swiperContainer}
                            >
                                {activity.images.map((imgObj, index) => (
                                    <SwiperSlide key={index}>
                                        <Image 
                                            src={`/assets/shop/activities/${imgObj.img}`} 
                                            alt={`${activity.name_activitie} - Imagen ${index + 1}`} 
                                            className={styles.mainImage} 
                                            width={500}
                                            height={500}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className={styles.noImage}>Sin imagen</div>
                        )}
                    </div>
                </div>

                {/* Right Side - Key Information */}
                <div className={styles.infoColumn}>
                    {/* Quick Info Summary */}
                    <div className={styles.quickSummary}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>⏱</span>
                                <span className={styles.value}>{activity.duration} min</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>👥</span>
                                <span className={styles.value}>{activity.max_participants} personas</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>💪</span>
                                <span className={styles.value}>Nivel {activity.intensity}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📅</span>
                                <span className={styles.value}>{getDayOfWeek(activity.id_dayoftheweek)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.descriptionBox}>
                        <h3 className={styles.sectionTitle}>Descripción</h3>
                        <p className={styles.description}>{activity.description || 'Sin descripción disponible'}</p>
                    </div>

                    {/* Tags */}
                    <div className={styles.tagsWrapper}>
                        {Array.isArray(activity.caracteristics) && activity.caracteristics.length > 0 ? (
                            activity.caracteristics.map((tag: string, index: number) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                            ))
                        ) : (
                            <span className={styles.noTags}>Sin etiquetas</span>
                        )}
                    </div>

                    {/* Accessibility and Medical Support */}
                    <div className={styles.supportInfo}>
                        <div className={styles.accessibilityPanel}>
                            <h3 className={styles.sectionTitle}>♿ Accesibilidad</h3>
                            <div className={styles.supportGrid}>
                                <div className={styles.supportItem}>
                                    <FaWheelchair />
                                    <span>Acceso para sillas</span>
                                </div>
                                <div className={styles.supportItem}>
                                    <FaSignLanguage />
                                    <span>Lenguaje de señas</span>
                                </div>
                                <div className={styles.supportItem}>
                                    <FaParking />
                                    <span>Parking accesible</span>
                                </div>
                                <div className={styles.supportItem}>
                                    <MdOutlineLocalHospital />
                                    <span>Apoyo médico</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Information (Below the fold) */}
            <div className={styles.detailedSection}>
                <h2 className={styles.sectionDivider}>Información Detallada</h2>
                
                {/* Statistics Grid */}
                <div className={styles.statsGrid}>
                    {/* Health Benefits */}
                    <div className={styles.statsCard}>
                        <h3>❤️ Beneficios para la Salud</h3>
                        <div className={styles.healthMetrics}>
                            <div className={styles.metricItem}>
                                <FaHeart />
                                <span>Beneficios para la salud: {healthMetrics.beneficiosSalud}%</span>
                            </div>
                            <div className={styles.metricItem}>
                                <FaUsers />
                                <span>Nivel de energía: {healthMetrics.nivelEnergia}%</span>
                            </div>
                            <div className={styles.metricItem}>
                                <MdSportsGymnastics />
                                <span>Mejora de postura: {healthMetrics.mejoraPostura}%</span>
                            </div>
                            <div className={styles.metricItem}>
                                <MdWaterDrop />
                                <span>Reducción de estrés: {healthMetrics.reduccionEstres}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className={styles.statsCard}>
                        <h3>📊 Estadísticas de Rendimiento</h3>
                        <RadarChart 
                            width={300} 
                            height={300} 
                            data={[
                                { subject: 'Resistencia', A: 120, fullMark: 150 },
                                { subject: 'Fuerza', A: 98, fullMark: 150 },
                                { subject: 'Agilidad', A: 86, fullMark: 150 },
                                { subject: 'Flexibilidad', A: 99, fullMark: 150 },
                                { subject: 'Coordinación', A: 85, fullMark: 150 },
                                { subject: 'Velocidad', A: 65, fullMark: 150 },
                            ]}
                            className={styles.chart}
                        >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar
                                name="Rendimiento"
                                dataKey="A"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </div>

                    {/* Pie Chart */}
                    <div className={styles.statsCard}>
                        <h3>📊 Estadísticas de Asistencia</h3>
                        <PieChart width={300} height={300} className={styles.chart}>
                            <Pie
                                data={[
                                    { name: 'Mañana', value: 400, color: '#0088FE' },
                                    { name: 'Tarde', value: 300, color: '#00C49F' },
                                    { name: 'Noche', value: 300, color: '#FFBB28' },
                                ]}
                                cx={150}
                                cy={150}
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {[
                                    { name: 'Mañana', color: '#0088FE' },
                                    { name: 'Tarde', color: '#00C49F' },
                                    { name: 'Noche', color: '#FFBB28' },
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>

                {/* Comments Section */}
                <section className={styles.commentsSection}>
                    <h2>💬 Comentarios de Usuarios</h2>
                    <div className={styles.comentarios}>
                        {comentariosFijos.map((comentario, index) => (
                            <div key={index} className={styles.comentario}>
                                <Avatar src={comentario.avatar} />
                                <div className={styles.comentarioContent}>
                                    <h4>{comentario.usuario}</h4>
                                    <p>{comentario.comentario}</p>
                                    <span>{comentario.fecha}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Blog Section */}
                <section className={styles.blogSection}>
                    <h2>📝 Blog Relacionado</h2>
                    <div className={styles.blogEntries}>
                        {blogEntries.map((entry, index) => (
                            <div key={index} className={styles.blogEntry}>
                                <Image src={entry.imagen} alt={entry.titulo} width={300} height={200} />
                                <div className={styles.blogContent}>
                                    <h4>{entry.titulo}</h4>
                                    <p>{entry.resumen}</p>
                                    <span>Por {entry.autor} - {entry.fecha}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ActivityDetailsClient;

const getDayOfWeek = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber % 7];
};