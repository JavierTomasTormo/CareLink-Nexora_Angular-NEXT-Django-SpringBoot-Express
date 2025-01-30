'use client';

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/home/ServicesApplication.module.css';
import { ServicesApplicationSkeleton } from '../../skeletons/CarouselSkeletons';

interface Service {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  icon: string;
}

const ServicesApplication = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const services: Service[] = [
    {
      id: 1,
      title: 'Actividades',
      description: 'Amplia variedad de actividades físicas y recreativas adaptadas a diferentes niveles y necesidades.',
      extendedDescription: 'Descubre nuestra amplia gama de actividades diseñadas para mantener un estilo de vida activo y saludable. Desde yoga y pilates hasta ejercicios de rehabilitación y actividades grupales. Nuestros instructores certificados te guiarán en cada paso del camino.',
      icon: '/assets/home/servicesApplication/activities.png',
    },
    {
      id: 2,
      title: 'Comidas y Dietas',
      description: 'Planes nutricionales personalizados y menús saludables diseñados por expertos.',
      extendedDescription: 'Nuestro equipo de nutricionistas expertos desarrolla planes alimenticios personalizados que se adaptan a tus necesidades específicas. Contamos con menús variados y deliciosos que combinan sabor y salud, supervisados por especialistas en nutrición geriátrica.',
      icon: '/assets/home/servicesApplication/meals.png',
    },
    {
      id: 3,
      title: 'Medicación',
      description: 'Sistema de gestión y seguimiento de medicación personalizado y seguro.',
      extendedDescription: 'Gestionamos tu medicación con un sistema avanzado de seguimiento y notificaciones. Nuestro equipo médico especializado supervisa cada aspecto de tu tratamiento, asegurando una administración precisa y segura de medicamentos.',
      icon: '/assets/home/servicesApplication/medications.png',
    },
  ];

  const handleServiceClick = (service: Service) => {
    setSelectedService(selectedService?.id === service.id ? null : service);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ServicesApplicationSkeleton />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.sphereContainer}>
        {services.map((service) => (
          <div
            key={service.id}
            className={`${styles.sphere} ${selectedService?.id === service.id ? styles.active : ''}`}
            onClick={() => handleServiceClick(service)}
          >
            <Image
              src={service.icon}
              alt={service.title}
              width={40}
              height={40}
              priority={false}
              className={styles.icon}
            />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className={`${styles.description} ${styles.slideIn}`}>
          <div className={styles.descriptionHeader}>
            <h2>{selectedService.title}</h2>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>
          </div>
          <p className={styles.shortDescription}>{selectedService.description}</p>
          <p className={styles.extendedDescription}>{selectedService.extendedDescription}</p>
          <button className={styles.actionButton}>
            {selectedService.id === 1 && 'Ver Actividades'}
            {selectedService.id === 2 && 'Explorar Menús'}
            {selectedService.id === 3 && 'Consultar Especialistas'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesApplication;
