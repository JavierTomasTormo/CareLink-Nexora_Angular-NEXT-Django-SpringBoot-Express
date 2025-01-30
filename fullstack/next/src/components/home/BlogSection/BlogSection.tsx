'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/BlogSection/BlogSection.module.css';
import { BlogSkeleton } from '@/components/skeletons/HomeSkeletons';


interface BlogPost {
    title: string;
    date: string;
    excerpt: string;
    image: string;
}

const blogPosts: BlogPost[] = [
    {
        title: "CONSEJOS DE NUTRICIÓN SALUDABLE",
        date: "Nov 15, 2023",
        excerpt: "Descubre los mejores consejos para mantener una alimentación equilibrada y mejorar tu salud general.",
        image: "https://asociacionafda.com/wp-content/uploads/2023/03/uju-96-1080x675.webp"
    },
    {
        title: "EJERCICIOS PARA PRINCIPIANTES",
        date: "Nov 14, 2023",
        excerpt: "Guía completa de ejercicios básicos para comenzar tu rutina de ejercicios de manera segura.",
        image: "https://www.sanitas.es/media/cen/imagen/grande/img_noticia-entrenamiento-funcional/img-entrenamiento-funcional.jpg"
    },
    {
        title: "BIENESTAR MENTAL",
        date: "Nov 13, 2023",
        excerpt: "Estrategias prácticas para mantener un equilibrio mental y emocional en tu vida diaria.",
        image: "https://www.coralyshealth.com/wp-content/uploads/2021/12/Equilibrio-768x551.png"
    }
];

const BlogSection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <BlogSkeleton />;
    }

    return (
        <div className={`${styles.sect} ${styles.sect_grey}`}>
        <div className={styles.container}>
            <div className={styles.row_center}>
            <div className={styles.col_intro}>
                <h1 className={styles.sect_title}>Nuestros Artículos Destacados</h1>
                <p className={styles.sect_subtitle}>
                Explora nuestros artículos sobre salud, nutrición y bienestar para ayudarte a comprender el porque de nuestra dedicación.
                </p>
            </div>
            </div>
            
            <div className={styles.articles_grid}>
            {blogPosts.map((post, index) => (
                <div key={index} className={styles.article_pre}>
                <div 
                    className={styles.article_img}
                    style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className={styles.article_info}>
                    <h1 className={styles.article_title}>{post.title}</h1>
                    <span className={styles.article_date}>{post.date}</span>
                    <p className={styles.article_excerpt}>{post.excerpt}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default BlogSection;