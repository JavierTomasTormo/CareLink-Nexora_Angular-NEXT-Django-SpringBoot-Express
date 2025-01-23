import CarrouselPrincipal from '@/components/home/CarrouselPrincipal';
import CarrouselSecundario from '@/components/home/CarrouselSecundario';
import ServicesApplication from '@/components/home/ServicesApplication';
import EmblaCarousel from '@/components/home/EmblaCarousel';
import styles from '@/styles/home/home.module.css';
import '@/styles/home/base.css';
import '@/styles/home/sandbox.css';
import '@/styles/home/embla.css';

export default function HomePage() {
  const slides = [0, 1, 2, 3, 4]; // Ejemplo de imágenes, puedes personalizarlo según el contenido.

  return (
    <div className={styles.home}>
      {/* Carrusel Principal */}
      <CarrouselPrincipal />

      {/* Carrusel Secundario */}
      <CarrouselSecundario />

      {/* Servicios de la Aplicación */}
      <ServicesApplication />

      {/* Carrusel Embla */}
      <div style={{ marginTop: '2rem' }}>
        <EmblaCarousel slides={slides} options={{ loop: true }} />
      </div>
    </div>
  );
}