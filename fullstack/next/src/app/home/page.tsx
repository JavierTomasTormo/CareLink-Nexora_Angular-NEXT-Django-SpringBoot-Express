import CarrouselPrincipal from '@/components/home/CarrouselPrincipal';
import CarrouselSecundario from '@/components/home/CarrouselSecundario';
import styles from '@/styles/home/home.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* Carrusel Principal */}
      <CarrouselPrincipal />

      {/* Carrusel Secundario */}
      <CarrouselSecundario />
    </div>
  );
}
