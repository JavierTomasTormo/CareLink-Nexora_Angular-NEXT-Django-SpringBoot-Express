"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/meals/AllergensModal.module.css";

interface AllergensModalProps {
  selectedAllergens: string[];
  onAllergenChange: (allergen: string) => void;
  onClose: () => void;
}

const allergensList = {
  "🌾 Gluten y Cereales": [
    "Trigo", "Cebada", "Centeno", "Avena", "Espelta", "Kamut", "Triticale",
    "Pan", "Pasta", "Galletas", "Cereales de desayuno", "Cerveza"
  ],
  "🥛 Lácteos y Lactosa": [
    "Leche", "Queso", "Yogur", "Mantequilla", "Crema", "Helado",
    "Proteína de leche", "Caseína", "Suero de leche", "Lactosa"
  ],
  "🥚 Huevos y Derivados": [
    "Clara de huevo", "Yema de huevo", "Huevo en polvo", "Albúmina",
    "Mayonesa", "Merengue", "Productos de pastelería"
  ],
  "🥜 Frutos Secos y Semillas": [
    "Almendras", "Nueces", "Avellanas", "Anacardos", "Pistachos",
    "Nueces de Brasil", "Nueces de Macadamia", "Piñones",
    "Semillas de sésamo", "Semillas de girasol", "Semillas de amapola"
  ],
  "🫘 Legumbres": [
    "Cacahuetes", "Soja", "Lentejas", "Garbanzos", "Judías",
    "Guisantes", "Habas", "Altramuces"
  ],
  "🐟 Pescados y Mariscos": [
    "Pescado blanco", "Pescado azul", "Atún", "Salmón", "Merluza",
    "Camarones", "Langostinos", "Cangrejo", "Mejillones", "Almejas",
    "Surimi", "Gelatina de pescado"
  ],
  "⚠️ Otros Alérgenos": [
    "Sulfitos y conservantes", "Mostaza", "Apio", "Moluscos",
    "Colorantes artificiales", "Ácido benzoico", "Glutamato monosódico"
  ]
};

const AllergensModal = ({ selectedAllergens, onAllergenChange, onClose }: AllergensModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const filteredAllergensList = Object.entries(allergensList).reduce((acc, [category, allergens]) => {
    const selected = allergens.filter(allergen => selectedAllergens.includes(allergen));
    const unselected = allergens.filter(allergen => !selectedAllergens.includes(allergen));
    
    const sortedAllergens = [...selected, ...unselected].filter(allergen => 
      allergen.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortedAllergens.length > 0) {
      acc[category as keyof typeof allergensList] = sortedAllergens;
    }
    return acc;
  }, {} as typeof allergensList);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.closeX} onClick={onClose}>×</button>
        </div>
        <h2>🚫 Filter by Allergens</h2>
        <div className={styles.selectedAllergensBar}>
          {selectedAllergens.map((allergen) => (
            <span key={allergen} className={styles.selectedAllergenTag}>
              {allergen} <button onClick={() => onAllergenChange(allergen)}>×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search allergens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.allergensList}>
          {Object.entries(filteredAllergensList).map(([category, allergens]) => (
            <div key={category} className={styles.allergenCategory}>
              <h3>{category}</h3>
              {allergens.map((allergen) => (
                <label key={allergen} className={styles.allergenItem}>
                  <input
                    type="checkbox"
                    checked={selectedAllergens.includes(allergen)}
                    onChange={() => onAllergenChange(allergen)}
                  />
                  {allergen}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllergensModal;
