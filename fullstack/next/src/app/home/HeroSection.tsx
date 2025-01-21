import styles from './home.module.css'; // Importar CSS module

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroSection}>
      <h1>Bienvenidos a VitalNest</h1>
      <p>Descubre los mejores productos para tu salud y bienestar.</p>
    </div>
  );
};

export default HeroSection;
