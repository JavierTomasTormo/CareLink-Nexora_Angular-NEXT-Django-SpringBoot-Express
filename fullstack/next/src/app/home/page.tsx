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
  title: 'CareLink by Nexora - Gestión Integral de Residencias',
  description: 'Sistema avanzado de gestión para residencias de ancianos desarrollado por Nexora Technologies. Solución integral para control de medicaciones, seguimiento médico y gestión de personal.',
  keywords: ['CareLink', 'Nexora', 'gestión residencias', 'software geriátrico', 'control medicación', 'historial médico', 'gestión sanitaria'],
  authors: [{ name: 'Nexora Technologies' }],
  openGraph: {
    title: 'CareLink by Nexora - Gestión Integral de Residencias',
    description: 'Plataforma avanzada para la gestión de residencias geriátricas. Control de medicaciones, expedientes médicos y administración completa.',
    url: 'https://carelink.nexora.com',
    siteName: 'CareLink by Nexora',
    type: 'website',
    images: [
      {
        url: 'https://carelink.nexora.com/images/carelink-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'CareLink Dashboard'
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