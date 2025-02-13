'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/TypesSection/Types.module.css';
import { TypesSkeleton } from '@/components/skeletons/HomeSkeletons';

export interface CoffeeItem {
    name: string;
    description: string;
    image: string;
}

const coffeeTypes: CoffeeItem[] = [
    {
        name: "Actividades",
        description: "Descubre una amplia gama de actividades diseñadas para mantener activos y entretenidos a tus seres queridos.",
        image: "https://cdn-icons-png.flaticon.com/512/12693/12693547.png",
        buttonText: "Ver Actividades"
    },
    {
        name: "Alimentación",
        description: "Planes nutricionales personalizados y consejos de alimentación adaptados a las necesidades específicas.",
        image: "https://cdn-icons-png.freepik.com/512/4310/4310157.png",
        buttonText: "Elegir Platos"
    },
    {
        name: "Habitaciones",
        description: "Espacios seguros y confortables diseñados pensando en el bienestar y la comodidad de tus familiares.",
        image: "https://cdn-icons-png.flaticon.com/512/3306/3306971.png",
        buttonText: "Ver Espacios"
    }
];

const CoffeeTypes = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <TypesSkeleton />;
    }
return (
    <section className={styles.sect}>
    <div className={styles.container}>
        <div className={styles.row_center}>
        <div className={styles.col_intro}>
            <h1 className={styles.sect_title}>
            Explora Nuestra Variedad de Servicios
            </h1>
            <p className={styles.sect_subtitle}>
            Esto e sun texto de prueba JavierTomasTormo es el mejor programador de este proyecto!
            </p>
        </div>
        </div>
        
        <div className={styles.row_small}>
            {coffeeTypes.map((coffee, index) => (
                <div key={index} className={styles.coffee}>
                    <img src={coffee.image} className={styles.coffee_img} alt={coffee.name} />
                    <h2 className={styles.coffee_name}>{coffee.name}</h2>
                    <p className={styles.coffee_descr}>{coffee.description}</p>
                    <button className={styles.card_btn}>
                        {coffee?.buttonText}
                    </button>
                </div>
            ))}
        </div>
        
        {/* <div className={styles.row_center}>
        <a href="#" className={styles.btn}>Full menu</a>
        </div> */}
    </div>
    </section>
);
};

export default CoffeeTypes; 