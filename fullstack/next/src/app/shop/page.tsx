"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/shop/Slide";
import Filters from "@/components/shop/Filters";
import ListActivities from "@/components/shop/ListActivities";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VitalNest - Gestión Integral de Residencias para Mayores',
  description: 'Sistema de gestión especializado para residencias de ancianos. Ofrecemos control de medicaciones, dietas personalizadas, actividades especializadas y cuidados específicos para personas mayores.',
  keywords: 'residencia ancianos, gestión residencial, cuidado mayores, control medicación, dietas especiales, habitaciones adaptadas, actividades seniors, atención personalizada',
  openGraph: {
    title: 'VitalNest - Sistema de Gestión para Residencias de Mayores',
    description: 'Plataforma integral para la gestión de residencias de ancianos. Control de medicaciones, dietas y cuidados personalizados para el bienestar de nuestros mayores.',
    type: 'website',
    url: 'https://www.vitalnest.com',
    images: [
      {
        url: 'https://www.vitalnest.com/images/care-center.jpg',
        width: 1200,
        height: 630,
        alt: 'VitalNest Care Center',
      },
    ],
  },
  authors: [{ name: 'VitalNest Care Management' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}
export default function ActivitiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [activeFilterColor, setActiveFilterColor] = useState<string>("");

  const filterColors = [
    { id: 1, color: "#FFE5D9", name: "Cuidados" },
    { id: 2, color: "#E3F4D7", name: "Exteriores" },
    { id: 3, color: "#FFE0E9", name: "Rehabilitaciónes" },
    { id: 4, color: "#E0F4FF", name: "Relajación" },
    { id: 5, color: "#E8E0FF", name: "Educación" },
  ];

  useEffect(() => {
    const queryFilter = searchParams.get("type_activity");
    if (queryFilter) {
      const filterId = parseInt(queryFilter, 10);
      setActiveFilter(filterId);
      const filter = filterColors.find(f => f.id === filterId);
      if (filter) setActiveFilterColor(filter.color);
    }
  }, [searchParams]);

  const handleFilterChange = (id: number, color: string) => {
    setActiveFilter(id);
    setActiveFilterColor(color);
    router.push(`?type_activity=${id}`, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>VitalNest - Activities</title>
        <meta name="description" content="Encuentra las mejores actividades y servicios en nuestra tienda VitalNest" />
        <meta name="keywords" content="cuidados, exteriores, rehabilitaciones, relajación, educación, servicios" />
        <meta name="author" content="VitalNest Team" />
        <meta property="og:title" content="VitalNest - Shop" />
        <meta property="og:description" content="Encuentra las mejores actividades y servicios en nuestra tienda VitalNest" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitalnest.com/shop" />
        <meta property="og:image" content="https://www.vitalnest.com/images/shop-og-image.jpg" />
      </Head>
      <div className={styles.shop} style={{ backgroundColor: activeFilterColor }}>
        <Filters onFilterChange={handleFilterChange} />
        <Slide activeFilter={activeFilter} activeFilterColor={activeFilterColor} onFilterChange={handleFilterChange} />
        <ListActivities typeActivity={activeFilter} />
      </div>
    </>
  );
}