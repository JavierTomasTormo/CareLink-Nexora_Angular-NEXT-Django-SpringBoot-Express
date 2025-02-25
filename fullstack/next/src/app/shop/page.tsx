import type { Metadata, Viewport } from 'next';
import ShopClient from '@/components/shop/ShopClient';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0078D7'
};

export const metadata: Metadata = {
  title: 'CareLink by Nexora | Catálogo de Servicios',
  description: 'Explore nuestra amplia gama de servicios para residencias geriátricas: rehabilitación, actividades terapéuticas, servicios médicos y cuidados especializados.',
  keywords: 'servicios geriátricos, atención personalizada, rehabilitación, terapia ocupacional, CareLink, Nexora, gestión residencial',
  openGraph: {
    title: 'CareLink by Nexora | Catálogo de Servicios',
    description: 'Servicios especializados para residencias de ancianos integrados en la plataforma CareLink',
    type: 'website',
    url: 'https://carelink.nexora.com/shop',
    siteName: 'CareLink by Nexora',
  },
  robots: 'index, follow',
};

export default function ActivitiesPage() {
  return <ShopClient />;
}
