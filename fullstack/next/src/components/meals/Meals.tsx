"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals, selectAllMeals, selectMealsStatus, selectMealsError } from "@/store/slices/mealsSlice";
import styles from "@/styles/meals/Meals.module.css";
import Image from "next/image";
import { AppDispatch } from "@/store";

interface MealsProps {
  typeMeal: string;
  minCalories: number;
  maxCalories: number;
  allergens: string[];
  role: string;
}

const Meals = ({ typeMeal, minCalories, maxCalories, allergens, role }: MealsProps) => {
  const meals = useSelector(selectAllMeals);
  const mealsStatus = useSelector(selectMealsStatus);
  const mealsError = useSelector(selectMealsError);
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCount, setVisibleCount] = useState(5);
  const prevTypeMeal = useRef(typeMeal);

  useEffect(() => {
    if (mealsStatus === 'idle') {
      dispatch(fetchMeals());
    }
  }, [mealsStatus, dispatch]);



  useEffect(() => {
    if (prevTypeMeal.current !== typeMeal) {
      // console.log(`Sección cambiada de ${prevTypeMeal.current} a ${typeMeal}, reseteando a 5 platos`);
      setVisibleCount(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevTypeMeal.current = typeMeal;
    }
  }, [typeMeal]);

  useEffect(() => {
    setVisibleCount(5);
  }, [minCalories, maxCalories, allergens, role]);


  const filteredMeals = meals.filter((meal) =>
    Array.isArray(meal.type_meal) &&
    meal.type_meal.includes(typeMeal) &&
    meal.calories >= minCalories &&
    meal.calories <= maxCalories &&
    !allergens.some((allergen) => meal.allergens[allergen as keyof typeof meal.allergens]) &&
    (role === "" || meal.role[role as keyof typeof meal.role])
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  const visibleMeals = filteredMeals.slice(0, visibleCount);
  const hasMoreMeals = visibleCount < filteredMeals.length;


  if (mealsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (mealsStatus === 'failed') {
    return <div>Error: {mealsError}</div>;
  }
  return (
    <div className={styles.mealsWrapper}>
      {/* <div className={styles.mealsSection}>
        <h2 className={styles.sectionTitle}>
          {typeMeal === "desayuno" ? "Desayunos" : 
          typeMeal === "comida" ? "Comidas" :
          typeMeal === "merienda" ? "Meriendas" :
          typeMeal === "cena" ? "Cenas" : 
          typeMeal === "postre" ? "Postres" : "Platos"}
          <span className={styles.mealCount}>, {filteredMeals.length} opciones disponibles</span>
        </h2>
      </div> */}

      <div className={styles.mealsContainer}>
        {visibleMeals.map((meal) => (
          <div key={meal.id} className={styles.mealCard}>
            <div className={styles.mealImageContainer}>
              <Image 
                src={`/assets/shop/meals/specific/${meal.img}`} 
                alt={meal.name} 
                className={styles.mealImage} 
                width={500} 
                height={300}
              />
            </div>
            <div className={styles.mealDetails}>
              <h3 className={styles.mealName}>{meal.name}</h3>
              <p className={styles.mealDescription}>{meal.description}</p>
              <p className={styles.mealCalories}>{meal.calories} calorías</p>
            </div>
          </div>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className={styles.noResultsContainer}>
          <p>No se encontraron platos con los filtros seleccionados.</p>
        </div>
      )}

      {hasMoreMeals && (
        <div className={styles.loadMoreContainer}>
          <button 
            className={styles.loadMoreButton} 
            onClick={handleLoadMore}
            aria-label={`Cargar 5 platos más (mostrando ${visibleCount} de ${filteredMeals.length})`}
          >
            Cargar más platos ({visibleCount}/{filteredMeals.length})
          </button>
        </div>
      )}
    </div>
  );
};


export default Meals;