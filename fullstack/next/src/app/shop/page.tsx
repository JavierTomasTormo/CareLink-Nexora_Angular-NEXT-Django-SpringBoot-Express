"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/shop/Slide";
import Filters from "@/components/shop/Filters";
import ListActivities from "@/components/shop/ListActivities";

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
  

  const getTypeActivity = () => {
    switch (activeFilter) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
      case 4:
        return "4";
      case 5:
        return "5";
      default:
        return "";
    }
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
        <ListActivities typeActivity={getTypeActivity()} />
      </div>
    </>
  );
}