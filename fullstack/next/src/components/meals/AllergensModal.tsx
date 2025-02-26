"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import styles from "@/styles/meals/AllergensModal.module.css";

interface AllergensModalProps {
  selectedAllergens: string[];
  onAllergenChange: (allergen: string) => void;
  onClose: () => void;
}
export type AllergyCategories = {
  'Alimentos': string[];
}

export const DEFAULT_ACTIVE_CATEGORY: keyof AllergyCategories = 'Alimentos';

export const ALLERGIES_CATEGORIES: AllergyCategories = {
  'Alimentos': [
    '🥜 Frutos secos',
    '🥛 Lactosa',
    '🌾 Gluten', 
    '🦐 Mariscos',
    '🥚 Huevo',
    '🫘 Soja',
    '🍫 Chocolate',
    '🎨 Colorantes alimentarios',
    '🥫 Conservantes',
    '🍎 Frutas',
    '🥕 Vegetales',
    '🫘 Legumbres',
    '🌶️ Especias',
    '🥩 Carnes rojas',
    '🌊 Algas',
    '🌾 Harinas'
  ]
};

const AllergensModal = ({ selectedAllergens, onAllergenChange, onClose }: AllergensModalProps) => {
  const [activeCategory, setActiveCategory] = useState<keyof AllergyCategories>(DEFAULT_ACTIVE_CATEGORY);
  const [customAllergy, setCustomAllergy] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const categories = Object.keys(ALLERGIES_CATEGORIES) as Array<keyof AllergyCategories>;
  
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergens.includes(customAllergy.trim())) {
      onAllergenChange(customAllergy.trim());
      setCustomAllergy("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCustomAllergy();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Seleccionar Alergias</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        {/* Categorías */}
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Alergias por categoría */}
        <div className={styles.allergiesGrid}>
          {ALLERGIES_CATEGORIES[activeCategory].map((allergy) => (
            <div
              key={allergy}
              onClick={() => onAllergenChange(allergy)}
              className={`${styles.allergyItem} ${selectedAllergens.includes(allergy) ? styles.selected : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedAllergens.includes(allergy)}
                readOnly
                className={styles.checkbox}
              />
              <span className={styles.allergyText}>{allergy}</span>
            </div>
          ))}
        </div>
        
        {/* Alergia personalizada */}
        <div className={styles.customAllergyContainer}>
          <form onSubmit={handleSubmit} className={styles.customAllergyForm}>
            <input
              type="text"
              value={customAllergy}
              onChange={(e) => setCustomAllergy(e.target.value)}
              className={styles.customAllergyInput}
              placeholder="Agregar otra alergia..."
            />
            <button
              type="submit"
              className={styles.addButton}
            >
              Añadir
            </button>
          </form>
        </div>
        
        {/* Alergias seleccionadas */}
        <div className={styles.selectedAllergiesContainer}>
          <h4 className={styles.selectedAllergiesTitle}>Alergias Seleccionadas</h4>
          <div className={styles.selectedAllergiesList}>
            {selectedAllergens.map((allergy) => (
              <span key={allergy} className={styles.selectedAllergyTag}>
                {allergy}
                <button
                  type="button"
                  onClick={() => onAllergenChange(allergy)}
                  className={styles.removeAllergyButton}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className={styles.actionButtons}>
          <button
            type="button"
            onClick={onClose}
            className={styles.confirmButton}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllergensModal;