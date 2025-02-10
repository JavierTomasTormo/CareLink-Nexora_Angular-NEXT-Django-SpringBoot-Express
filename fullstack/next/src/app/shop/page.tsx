"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/shop/Slide";
import Filters from "@/components/shop/Filters";
import ListActivities from "@/components/shop/ListActivities";

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: 'VitalNest | Shop - Activities & Services',
  description: 'Explore our wide range of elderly care activities including rehabilitation, outdoor activities, relaxation services, educational programs, and specialized care services.',
  keywords: 'elderly care activities, rehabilitation services, outdoor activities, relaxation therapy, educational programs, senior care',
  openGraph: {
    title: 'VitalNest | Shop - Activities & Services',
    description: 'Discover specialized activities and services for elderly care at VitalNest',
    type: 'website',
    url: 'https://vitalnest.com/shop',
    siteName: 'VitalNest',
  },
  robots: 'index, follow',
  themeColor: '#ffffff'
};

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