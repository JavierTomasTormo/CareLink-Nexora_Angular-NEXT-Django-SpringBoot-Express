'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchActivity, selectActivitiesStatus, selectActivitiesError } from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '@/styles/details/ActivityDetails.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUserInfo } from '@/utils/auth';
import { Avatar } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { FaWheelchair, FaSignLanguage, FaAccessibleIcon, FaParking, FaHeart, FaUsers } from 'react-icons/fa';
import { MdOutlineLocalHospital, MdSportsGymnastics, MdWaterDrop } from 'react-icons/md';

const ActivityDetailsClient: React.FC<{ activityId: string }> = ({ activityId }) => {
    // Redux and Router setup
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const activity = useSelector((state: RootState) => state.activities.activities.find(a => a.id === parseInt(activityId)));
    const status = useSelector(selectActivitiesStatus);
    const error = useSelector(selectActivitiesError);
    const isLoggedIn = isAuthenticated();
    const userInfo = getUserInfo();

    // Mock Data
    const performanceData = [
        { name: 'Semana 1', calories: 300, usuarios: 25 },
        { name: 'Semana 2', calories: 400, usuarios: 30 },
        { name: 'Semana 3', calories: 350, usuarios: 28 },
        { name: 'Semana 4', calories: 500, usuarios: 35 },
    ];

    const healthMetrics = {
        beneficiosSalud: 85,
        nivelEnergia: 90,
        mejoraPostura: 75,
        reduccionEstres: 88,
    };

    const attendanceData = [
        { hora: '7:00', asistencia: 15 },
        { hora: '9:00', asistencia: 25 },
        { hora: '12:00', asistencia: 20 },
        { hora: '16:00', asistencia: 30 },
        { hora: '18:00', asistencia: 35 },
        { hora: '20:00', asistencia: 28 },
    ];

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
            </header>

            {/* Main Content Grid */}
            <div className={styles.mainGrid}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    {/* Image Carousel */}
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
                                        <img 
                                            src={`/assets/shop/activities/${imgObj.img}`} 
                                            alt={`${activity.name_activitie} - Imagen ${index + 1}`} 
                                            className={styles.mainImage} 
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className={styles.noImage}>Sin imagen</div>
                        )}
                    </div>

                    {/* Description and Basic Info */}
                    <div className={styles.basicInfo}>
                        <p className={styles.description}>{activity.description || 'Sin descripción disponible'}</p>
                        
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

                    {/* Health Benefits Section */}
                    <section className={styles.healthSection}>
                        <h2>❤️ Beneficios para la Salud</h2>
                        <div className={styles.healthMetrics}>
                            <div className={styles.metricItem}>
                                <FaHeart />
                                <span>Beneficios para la salud: {healthMetrics.beneficiosSalud}%</span>
                            </div>
                            <div className={styles.metricItem}>
                                <FaUsers />
                                <span>Nivel de energía: {healthMetrics.nivelEnergia}%</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className={styles.rightColumn}>
                    {/* Statistics Section */}
                    <section className={styles.statsSection}>
                        <h2>📊 Estadísticas de Rendimiento</h2>
                        <RadarChart 
                            width={600} 
                            height={400} 
                            data={[
                                { subject: 'Resistencia', A: 120, fullMark: 150 },
                                { subject: 'Fuerza', A: 98, fullMark: 150 },
                                { subject: 'Agilidad', A: 86, fullMark: 150 },
                                { subject: 'Flexibilidad', A: 99, fullMark: 150 },
                                { subject: 'Coordinación', A: 85, fullMark: 150 },
                                { subject: 'Velocidad', A: 65, fullMark: 150 },
                            ]}
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
                    </section>

                    {/* Attendance Section */}
                    <section className={styles.attendanceSection}>
                        <h2>📊 Estadísticas de Asistencia</h2>
                        <PieChart width={600} height={400}>
                            <Pie
                                data={[
                                    { name: 'Mañana', value: 400, color: '#0088FE' },
                                    { name: 'Tarde', value: 300, color: '#00C49F' },
                                    { name: 'Noche', value: 300, color: '#FFBB28' },
                                ]}
                                cx={300}
                                cy={200}
                                innerRadius={60}
                                outerRadius={120}
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
                    </section>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className={styles.bottomSections}>
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
                                <img src={entry.imagen} alt={entry.titulo} />
                                <div className={styles.blogContent}>
                                    <h4>{entry.titulo}</h4>
                                    <p>{entry.resumen}</p>
                                    <span>Por {entry.autor} - {entry.fecha}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Facilities Section */}
                <div className={styles.facilitiesContainer}>
                    <section className={styles.accessibilitySection}>
                        <h2>♿ Accesibilidad y Ayudas</h2>
                        <div className={styles.accessibilityGrid}>
                            <div className={styles.accessibilityItem}>
                                <FaWheelchair size={24} />
                                <span>Acceso para sillas de ruedas</span>
                            </div>
                            <div className={styles.accessibilityItem}>
                                <FaSignLanguage size={24} />
                                <span>Intérprete de lenguaje de señas disponible</span>
                            </div>
                            <div className={styles.accessibilityItem}>
                                <FaParking size={24} />
                                <span>Estacionamiento accesible</span>
                            </div>
                            <div className={styles.accessibilityItem}>
                                <FaAccessibleIcon size={24} />
                                <span>Equipamiento adaptado</span>
                            </div>
                        </div>
                    </section>

                    <section className={styles.medicalSection}>
                        <h2>🏥 Atención Médica y Seguridad</h2>
                        <div className={styles.medicalGrid}>
                            <div className={styles.medicalItem}>
                                <MdOutlineLocalHospital size={24} />
                                <span>Personal médico de guardia</span>
                            </div>
                            <div className={styles.medicalItem}>
                                <MdSportsGymnastics size={24} />
                                <span>Monitores especializados</span>
                            </div>
                            <div className={styles.medicalItem}>
                                <MdWaterDrop size={24} />
                                <span>Hidratación disponible</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Tags Section */}
                <div className={styles.tagsWrapper}>
                    {Array.isArray(activity.caracteristics) && activity.caracteristics.length > 0 ? (
                        activity.caracteristics.map((tag: string, index: number) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))
                    ) : (
                        <span className={styles.noTags}>Sin etiquetas</span>
                    )}
                </div>
            </div>

            {/* Footer Section */}
            <footer className={styles.footer}>
                <button className={styles.inscriptionButton} onClick={handleInscription}>
                    Inscribirse
                </button>
            </footer>
        </div>
    );
};

export default ActivityDetailsClient;

const getDayOfWeek = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber % 7];
};