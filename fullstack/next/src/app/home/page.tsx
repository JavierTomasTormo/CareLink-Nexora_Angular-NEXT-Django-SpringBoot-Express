
import BannerSection from '@/components/home/Banner/BannerSection';
import TypesSection from '@/components/home/TypesSection/TypesSection';
import OurStory from '@/components/home/StorySection/OurStory';
import FreshActivities from '@/components/home/FreshBeansActivitie/FreshActivities';
import GreatMealsSection from '@/components/home/GreatMealsSection/GreatMealsSection';
import BestRoomsSection from '@/components/home/BestRoomsSection/BestRoomsSection';
import GallerySection from '@/components/home/GallerySection/GallerySection';
import BlogSection from '@/components/home/BlogSection/BlogSection';
import Head from 'next/head';

/* Comentados temporalmente
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
*/

export default function HomePage() {
  // const slides = [0, 1, 2, 3, 4];

  return (
    <>
      <Head>
        <title>VitalNest - Gestión Integral de Residencias para Mayores</title>
        <meta name="description" content="Sistema de gestión especializado para residencias de ancianos. Control de medicaciones, dietas personalizadas y cuidados específicos para personas mayores." />
        <meta name="keywords" content="residencia ancianos, gestión residencial, cuidado mayores, control medicación, dietas especiales, atención personalizada" />
        <meta name="author" content="VitalNest Care Management" />
        <meta property="og:title" content="VitalNest - Sistema de Gestión para Residencias de Mayores" />
        <meta property="og:description" content="Plataforma integral para la gestión de residencias de ancianos. Control de medicaciones, dietas y cuidados personalizados para el bienestar de nuestros mayores." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitalnest.com" />
        <meta property="og:image" content="https://www.vitalnest.com/images/care-center.jpg" />
      </Head>

      <BannerSection />
      <TypesSection />
      <OurStory />
      <FreshActivities />
      <GreatMealsSection />
      <BestRoomsSection />
      <GallerySection />
      <BlogSection />
    </>
  );
}