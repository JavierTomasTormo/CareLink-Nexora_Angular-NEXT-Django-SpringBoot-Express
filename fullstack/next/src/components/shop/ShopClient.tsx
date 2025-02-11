"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/shop/Slide";
import Filters from "@/components/shop/Filters";
import ListActivities from "@/components/shop/ListActivities";

const filterColors = [
  { id: 1, color: "#FFE5D9", name: "Cuidados" },
  { id: 2, color: "#E3F4D7", name: "Exteriores" },
  { id: 3, color: "#FFE0E9", name: "Rehabilitaciónes" },
  { id: 4, color: "#E0F4FF", name: "Relajación" },
  { id: 5, color: "#E8E0FF", name: "Educación" },
];

export default function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [activeFilterColor, setActiveFilterColor] = useState<string>("");

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
        <div className={styles.shop} style={{ backgroundColor: activeFilterColor }}>
            <Filters onFilterChange={handleFilterChange} />
            <Slide activeFilter={activeFilter} activeFilterColor={activeFilterColor} onFilterChange={handleFilterChange} />
            <ListActivities typeActivity={activeFilter} />
        </div>
    );
}