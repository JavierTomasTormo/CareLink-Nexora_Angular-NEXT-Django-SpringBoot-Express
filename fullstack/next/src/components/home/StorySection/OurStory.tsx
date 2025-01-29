    'use client';

    import styles from './OurStory.module.css';

    const OurStory = () => {
        return (
            <section className={styles.story_section}>
                <div className={styles.sect_brown}>
                    <div className={styles.container}>
                        <div className={styles.row_center}>
                            <div className={styles.col_content}>
                                <div className={styles.story_content}>
                                    <h1 className={styles.sect_title}>Nuestra Historia</h1>
                                    <div className={styles.sect_subtitle}>
                                        <p>En VitalNest, nos dedicamos a mejorar la calidad de vida.</p>
                                        
                                        <p>Nuestra plataforma integral simplifica la gestión de residencias 
                                        para mayores, horarios de medicación y planes dietéticos personalizados.</p>
                                        
                                        <p>Queremos crear un ecosistema de apoyo que brinde tranquilidad 
                                        a las familias.</p>
                                        
                                        <p>Mientras tanto nos aseguramos que nuestros mayores reciban 
                                        la mejor atención y cuidado.</p>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.story_img}></div>
            </section>
        );
    };

    export default OurStory;