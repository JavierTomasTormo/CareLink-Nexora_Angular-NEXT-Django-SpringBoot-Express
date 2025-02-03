"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/meals/Meals.module.css";

interface Meal {
  id: number;
  img: string;
  name: string;
  description: string;
  calories: number;
  type_meal: string[]; // Aseguramos que sea un array de strings
}

interface MealsProps {
  typeMeal: string;
}

const Meals = ({ typeMeal }: MealsProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/food/meals/");
        const filteredMeals = response.data.filter((meal: Meal) =>
          Array.isArray(meal.type_meal) && meal.type_meal.includes(typeMeal)
        );
        setMeals(filteredMeals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [typeMeal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mealsContainer}>
      {meals.map((meal) => (
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