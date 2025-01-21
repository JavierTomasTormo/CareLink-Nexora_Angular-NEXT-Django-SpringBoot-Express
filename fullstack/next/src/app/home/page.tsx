import HeroSection from './HeroSection';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <p>Bienvenido a la página principal de VitalNest.</p>
    </div>
  );
}
