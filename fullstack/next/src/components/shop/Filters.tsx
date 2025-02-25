"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from 'react-redux';
import styles from "@/styles/meals/Filters.module.css";
import { filterActivitiesByType } from "@/store/slices/activitiesSlice";

const Filters = ({ onFilterChange, activeSlideId }: { onFilterChange: (id: number, color: string) => void, activeSlideId?: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch(); 

  const filterColors = useMemo(() => [
    { id: 1, color: "#FFE5D9", name: "Cuidados" },
    { id: 2, color: "#E3F4D7", name: "Exteriores" },
    { id: 3, color: "#FFE0E9", name: "Rehabilitaciónes" },
    { id: 4, color: "#E0F4FF", name: "Relajación" },
    { id: 5, color: "#E8E0FF", name: "Educación" },
  ], []);

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [activeFilterColor, setActiveFilterColor] = useState<string>("");

  useEffect(() => {
    const queryFilter = searchParams.get("activity_type");
    if (queryFilter) {
      const filterId = parseInt(queryFilter, 10);
      const filter = filterColors.find((f) => f.id === filterId);
      if (filter) {
        setActiveFilter(filterId);
        setActiveFilterColor(filter.color);
        onFilterChange(filterId, filter.color);
        document.body.setAttribute('data-sld', (filterId - 1).toString());
        dispatch(filterActivitiesByType(filterId));
      }
    }
  }, [searchParams, dispatch, onFilterChange, filterColors]);

  useEffect(() => {
    if (activeSlideId !== undefined) {
      const filter = filterColors.find((f) => f.id === activeSlideId + 1);
      if (filter) {
        setActiveFilter(filter.id);
        setActiveFilterColor(filter.color);
        onFilterChange(filter.id, filter.color);
        document.body.setAttribute('data-sld', activeSlideId.toString());
        dispatch(filterActivitiesByType(filter.id));
      }
    }
  }, [activeSlideId, dispatch, onFilterChange, filterColors]);

  const handleFilterClick = (id: number, color: string) => {
    setActiveFilter(id);
    setActiveFilterColor(color);
    onFilterChange(id, color);
    router.push(`?activity_type=${id}`, { scroll: false });
    document.body.setAttribute('data-sld', (id - 1).toString());
    dispatch(filterActivitiesByType(id));
  };

  return (
    <header
      className={styles.header}
      style={{
        background: activeFilterColor,
      }}
    >
      <div className={styles.logo}>Filtros</div>
      <div className={styles.headerMenu}>
        {filterColors.map((filter) => (
          <span
            key={filter.id}
            className={styles.menuItem}
            onClick={() => handleFilterClick(filter.id, filter.color)}
            style={{
              backgroundColor: activeFilter === filter.id ? filter.color : "",
            }}
          >
            {filter.name}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Filters;