"use client";

import { useState } from "react";
import styles from "@/styles/meals/FiltersMeals.module.css";
import AllergensModal from "./AllergensModal";

interface FiltersMealsProps {
  onCaloriesFilterChange: (minCalories: number, maxCalories: number) => void;
  onAllergensFilterChange: (allergens: string[]) => void;
  onRoleFilterChange: (role: string) => void;
}

const FiltersMeals = ({ onCaloriesFilterChange, onAllergensFilterChange, onRoleFilterChange }: FiltersMealsProps) => {
  const [maxCalories, setMaxCalories] = useState<number>(600);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCaloriesChange = (value: number) => {
    setMaxCalories(value);
    onCaloriesFilterChange(0, value);
  };

  const handleAllergenChange = (allergen: string) => {
    const updatedAllergens = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((a) => a !== allergen)
      : [...selectedAllergens, allergen];
    setSelectedAllergens(updatedAllergens);
    onAllergensFilterChange(updatedAllergens);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    onRoleFilterChange(role);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterItem}>
        <label htmlFor="maxCalories">Max Calories</label>
        <select
          id="maxCalories"
          value={maxCalories}
          onChange={(e) => handleCaloriesChange(Number(e.target.value))}
        >
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={600}>600</option>
          <option value={1000}>600 o más</option>
        </select>
      </div>
      <div className={styles.filterItem}>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Vegetalian">Vegetalian</option>
          <option value="Vegan">Vegan</option>
          <option value="Proteica">Proteica</option>
          <option value="Baja en calorias">Baja en calorias</option>
          {/* Mas roles */}
        </select>
      </div>
      <div className={styles.filterItem}>
        <label htmlFor="allergens">Allergens</label>
        <button className={styles.allergensButton} onClick={() => setIsModalOpen(true)}>
          Filter by Allergens
        </button>
      </div>
      {isModalOpen && (
        <AllergensModal
          selectedAllergens={selectedAllergens}
          onAllergenChange={handleAllergenChange}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FiltersMeals;