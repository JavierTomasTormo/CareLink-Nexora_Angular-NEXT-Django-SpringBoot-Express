"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals, selectAllMeals, selectMealsStatus, selectMealsError } from "@/store/slices/mealsSlice";
import styles from "@/styles/meals/Meals.module.css";

interface MealsProps {
  typeMeal: string;
  minCalories: number;
  maxCalories: number;
  allergens: string[];
  role: string;
}

interface Meal {
  id: string;
  type_meal: string[];
  calories: number;
  allergens: { [key: string]: boolean };
  role: { [key: string]: boolean };
  name: string;
  description: string;
  img: string;
}

const Meals = ({ typeMeal, minCalories, maxCalories, allergens, role }: MealsProps) => {
  const dispatch = useDispatch();
  const meals = useSelector(selectAllMeals);
  const mealsStatus = useSelector(selectMealsStatus);
  const mealsError = useSelector(selectMealsError);

  useEffect(() => {
    if (mealsStatus === 'idle') {
      dispatch(fetchMeals() as any);
    }
  }, [mealsStatus, dispatch]);

  const filteredMeals = meals.filter((meal) =>
    Array.isArray(meal.type_meal) &&
    meal.type_meal.includes(typeMeal) &&
    meal.calories >= minCalories &&
    meal.calories <= maxCalories &&
    !allergens.some((allergen) => meal.allergens[allergen as keyof typeof meal.allergens]) &&
    (role === "" || meal.role[role as keyof typeof meal.role])
  );

  if (mealsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (mealsStatus === 'failed') {
    return <div>Error: {mealsError}</div>;
  }

  return (
    <div className={styles.mealsContainer}>
      {filteredMeals.map((meal) => (
        <div key={meal.id} className={styles.mealCard}>
          <img src={`assets/shop/meals/specific/${meal.img}`} alt={meal.name} className={styles.mealImage} />
          <div className={styles.mealDetails}>
            <h3 className={styles.mealName}>{meal.name}</h3>
            <p className={styles.mealDescription}>{meal.description}</p>
            <p className={styles.mealCalories}>{meal.calories} calories</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;