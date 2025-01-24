import Head from 'next/head';
import CarrouselPrincipal from '@/components/home/CarrouselPrincipal';
import CarrouselSecundario from '@/components/home/CarrouselSecundario';
import ServicesApplication from '@/components/home/ServicesApplication';
import EmblaCarousel from '@/components/home/EmblaCarousel';
import EmblaCarousel2 from '@/components/home/EmblaCarousel2';
import EmblaCarousel3 from '@/components/home/EmblaCarousel3';
import styles from '@/styles/home/home.module.css';
import '@/styles/home/base.css';
import '@/styles/home/sandbox.css';
import '@/styles/home/embla.css';

export default function HomePage() {
  const slides = [0, 1, 2, 3, 4];

  return (
    <>
      <Head>
        <title>Home Page - VitalNest</title>
        <meta name="description" content="Welcome to VitalNest, your go-to platform for amazing services and features." />
        <meta name="keywords" content="VitalNest, services, features, carousel, application" />
        <meta name="author" content="VitalNest Team" />
        <meta property="og:title" content="Home Page - VitalNest" />
        <meta property="og:description" content="Welcome to VitalNest, your go-to platform for amazing services and features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitalnest.com/home" />
        <meta property="og:image" content="https://www.vitalnest.com/images/og-image.jpg" />
      </Head>
      <div className={styles.home}>
        {/* Carrusel Principal */}
        <CarrouselPrincipal />

        {/* Carrusel Secundario */}
        <CarrouselSecundario />

        {/* Servicios de la Aplicación */}
        <ServicesApplication />

        {/* Carrusel Embla */}
        <div className="embla-container" style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
          <EmblaCarousel slides={slides} options={{ loop: true }} />
          <EmblaCarousel2 slides={slides} options={{ loop: true }} />
          <EmblaCarousel3 slides={slides} options={{ loop: true }} />
        </div>
      </div>
    </>
  );
}