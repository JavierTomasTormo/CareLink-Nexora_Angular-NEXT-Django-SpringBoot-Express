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
  const [visibleCount, setVisibleCount] = useState(4);
  const prevTypeMeal = useRef(typeMeal);

  useEffect(() => {
    if (mealsStatus === 'idle') {
      dispatch(fetchMeals());
    }
  }, [mealsStatus, dispatch]);

  const normalizeAllergen = (allergen: string): string => {
    return allergen.replace(/^🍫|🥜|🥛|🌾|🦐|🥚|🫘|🎨|🥫|🍎|🥕|🌶️|🥩|🌊/, '').trim().toLowerCase();
  };

  useEffect(() => {
    if (meals.length > 0) {
      // console.log("Filtrando platos con los siguientes criterios:");
      // console.log(`- Tipo de comida: ${typeMeal}`);
      // console.log(`- Calorías: ${minCalories}-${maxCalories}`);
      // console.log(`- Alergias a evitar: ${allergens.join(', ')}`);
      // console.log(`- Rol: ${role || 'cualquiera'}`);
    }
  }, [typeMeal, minCalories, maxCalories, allergens, role, meals.length]);


  useEffect(() => {
    if (prevTypeMeal.current !== typeMeal) {
      // console.log(`Sección cambiada de ${prevTypeMeal.current} a ${typeMeal}, reseteando a 5 platos`);
      setVisibleCount(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevTypeMeal.current = typeMeal;
    }
  }, [typeMeal]);

  useEffect(() => {
    setVisibleCount(4);
  }, [minCalories, maxCalories, allergens, role]);


  const filteredMeals = meals.filter((meal) => {
    // Filtramos por tipo de comida
    if (!Array.isArray(meal.type_meal) || !meal.type_meal.includes(typeMeal)) {
      return false;
    }
    
    // Filtramos por calorías
    if (meal.calories < minCalories || meal.calories > maxCalories) {
      return false;
    }
    
    // Filtramos por rol
    if (role !== "" && (!meal.role || !meal.role[role as keyof typeof meal.role])) {
      return false;
    }
    
    // Filtramos por alergias - si el plato contiene alguna alergia seleccionada, lo excluimos
    if (allergens.length > 0 && meal.allergens) {
      // Normalizamos las alergias seleccionadas
      const normalizedAllergens = allergens.map(a => normalizeAllergen(a));
      
      // Comprobamos cada alergia normalizada contra las propiedades del objeto meal.allergens
      for (const allergen of normalizedAllergens) {
        // Buscamos si el plato tiene esta alergia marcada como true
        for (const key in meal.allergens) {
          if (key.toLowerCase().includes(allergen) && meal.allergens[key]) {
            // Este plato contiene la alergia, lo excluimos
            return false;
          }
        }
      }
    }
    
    return true;
  });

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
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
          <p>No se encontraron platos que coincidan con los filtros seleccionados.</p>
          {allergens.length > 0 && (
            <p className={styles.filterHint}>
              Estás filtrando por {allergens.length} alergias: {allergens.join(", ")}
            </p>
          )}
          <button 
            className={styles.resetFiltersButton} 
            onClick={() => {
              // Aquí necesitarías implementar la comunicación con el componente padre
              // para resetear todos los filtros
            }}
          >
            Reiniciar filtros
          </button>
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