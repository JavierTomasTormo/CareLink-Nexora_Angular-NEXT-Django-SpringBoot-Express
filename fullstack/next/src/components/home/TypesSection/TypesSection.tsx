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
        name: "Activides",
        description: "Esto es un texto de prueba para ve como queda esto hola hola caracola Javier was here",
        image: "https://cdn-icons-png.flaticon.com/512/12693/12693547.png"//https://image.ibb.co/bKy6Db/coffee_item_2.png
    },
    {
        name: "Alimentación",
        description: "Esto es un texto de prueba para ve como queda esto hola hola caracola Javier was here",
        image: "https://cdn-icons-png.freepik.com/512/4310/4310157.png"//https://image.ibb.co/nN0WeG/coffee_item_1.png
    },
    {
        name: "Habitaciones",
        description: "Esto es un texto de prueba para ve como queda esto hola hola caracola Javier was here",
        image: "https://cdn-icons-png.flaticon.com/512/3306/3306971.png"//https://image.ibb.co/dHQa6w/coffee_item_3.png
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
                </div>
            ))}
            </div>
            
            <div className={styles.row_center}>
            <a href="#" className={styles.btn}>Full menu</a>
            </div>
        </div>
        </section>
    );
    };

    export default CoffeeTypes; 