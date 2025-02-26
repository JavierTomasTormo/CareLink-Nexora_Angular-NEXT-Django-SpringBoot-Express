"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/shop/Slide";
import ListActivities from "@/components/shop/ListActivities";
import { filterColorsShop } from "@/store/Constants";


export default function ShopClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeFilter, setActiveFilter] = useState<number | null>(null);
    const [activeFilterColor, setActiveFilterColor] = useState<string>("");

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");


    useEffect(() => {
        const queryFilter = searchParams.get("activity_type");
        if (queryFilter) {
            const filterId = parseInt(queryFilter, 10);
            setActiveFilter(filterId);
            const filter = filterColorsShop.find(f => f.id === filterId);
            if (filter) setActiveFilterColor(filter.color);
        } else {
            router.replace(`?activity_type=1`, { scroll: false });
        }
    }, [searchParams, router]);

    const handleFilterChange = (id: number, color: string) => {
        if (id !== activeFilter) {
            setActiveFilter(id);
            setActiveFilterColor(color);
            router.push(`?activity_type=${id}`, { scroll: false });
        }
    };

    const handlePriceFilterChange = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
    };
    
        const handleTagsFilterChange = (selectedTags: string[]) => {
            setSelectedTags(selectedTags);
        };
    
        const handleDifficultyChange = (difficulty: string) => {
            setSelectedDifficulty(difficulty);
        };

    return (
        <div className={styles.shop} style={{ backgroundColor: activeFilterColor }}>
            <Slide 
                activeFilter={activeFilter} 
                activeFilterColor={activeFilterColor} 
                onFilterChange={handleFilterChange} 
            />            
            <ListActivities 
                typeActivity={activeFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
                tags={selectedTags}
                difficulty={selectedDifficulty}
            />
        </div>
    );
}