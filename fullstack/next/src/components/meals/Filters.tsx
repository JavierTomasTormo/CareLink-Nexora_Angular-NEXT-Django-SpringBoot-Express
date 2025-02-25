"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/meals/Filters.module.css";

const Filters = ({ onFilterChange }: { onFilterChange: (id: number, color: string) => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterColors = useMemo(() => [
    { id: 1, color: "#C1E1C1", name: "Desayunos" },
    { id: 2, color: "#F0D5A8", name: "Comidas" },
    { id: 3, color: "#E6C3C3", name: "Meriendas" },
    { id: 4, color: "#D4E6E6", name: "Cenas" },
    { id: 5, color: "#E8D1DC", name: "Postres" },
  ], []);

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [activeFilterColor, setActiveFilterColor] = useState<string>("");

  useEffect(() => {
    const queryFilter = searchParams.get("type_meal");
    if (queryFilter) {
      const filterId = parseInt(queryFilter, 10);
      const filter = filterColors.find((f) => f.id === filterId);
      if (filter) {
        setActiveFilter(filterId);
        setActiveFilterColor(filter.color);
        onFilterChange(filterId, filter.color);
        document.body.setAttribute('data-sld', (filterId - 1).toString());
      }
    }
  }, [searchParams, filterColors, onFilterChange]);

  const handleFilterClick = (id: number, color: string) => {
    setActiveFilter(id);
    setActiveFilterColor(color);
    onFilterChange(id, color);
    router.push(`?type_meal=${id}`, { scroll: false });
    document.body.setAttribute('data-sld', (id - 1).toString());
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