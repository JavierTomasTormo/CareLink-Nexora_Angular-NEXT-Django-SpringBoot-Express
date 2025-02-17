import BannerSection from '@/components/home/Banner/BannerSection';
import TypesSection from '@/components/home/TypesSection/TypesSection';
import AdditionalInfo from '@/components/home/AdditionalInfo/AdditionalInfo';
import FreshActivities from '@/components/home/FreshBeansActivitie/FreshActivities';
import GreatMealsSection from '@/components/home/GreatMealsSection/GreatMealsSection';
import BestRoomsSection from '@/components/home/BestRoomsSection/BestRoomsSection';
import BlogSection from '@/components/home/BlogSection/BlogSection';
import Head from 'next/head';
import AnimatedSection from './AnimatedSection';
import type { Metadata, Viewport } from 'next';



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: 'VitalNest - Gestión Integral de Residencias para Mayores',
  description: 'Sistema de gestión especializado para residencias de ancianos. Ofrecemos control de medicaciones, dietas personalizadas y cuidados específicos para personas mayores.',
  keywords: ['residencia ancianos', 'gestión residencial', 'cuidado mayores', 'control medicación', 'dietas especiales', 'atención personalizada'],
  authors: [{ name: 'VitalNest Care Management' }],
  openGraph: {
    title: 'VitalNest - Sistema de Gestión para Residencias de Mayores',
    description: 'Plataforma integral para la gestión de residencias de ancianos. Control de medicaciones, dietas y cuidados personalizados.',
    url: 'https://www.vitalnest.com',
    siteName: 'VitalNest',
    type: 'website',
    images: [
      {
        url: 'https://www.vitalnest.com/images/care-center.jpg',
        width: 1200,
        height: 630,
        alt: 'VitalNest Care Center'
      }
    ]
  }
};


export default function HomePage() {
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

      <main>
        <BannerSection />
        
        <AnimatedSection>
          <TypesSection />
        </AnimatedSection>

        <AnimatedSection>
          <AdditionalInfo />
        </AnimatedSection>

        <AnimatedSection>
          <FreshActivities />
        </AnimatedSection>

        <AnimatedSection>
          <GreatMealsSection />
        </AnimatedSection>

        <AnimatedSection>
          <BestRoomsSection />
        </AnimatedSection>

        <AnimatedSection>
          <BlogSection />
        </AnimatedSection>
    </main>
    </>
  );
}