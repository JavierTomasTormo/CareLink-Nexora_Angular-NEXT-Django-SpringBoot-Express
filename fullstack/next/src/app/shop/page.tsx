import type { Metadata, Viewport } from 'next';
import ShopClient from '@/components/shop/ShopClient';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff'
};

export const metadata: Metadata = {
  title: 'VitalNest | Shop - Activities & Services',
  description: 'Explore our wide range of elderly care activities including rehabilitation, outdoor activities, relaxation services, educational programs, and specialized care services.',
  keywords: 'elderly care activities, rehabilitation services, outdoor activities, relaxation therapy, educational programs, senior care',
  openGraph: {
    title: 'VitalNest | Shop - Activities & Services',
    description: 'Discover specialized activities and services for elderly care at VitalNest',
    type: 'website',
    url: 'https://vitalnest.com/shop',
    siteName: 'VitalNest',
  },
  robots: 'index, follow',
};

export default function ActivitiesPage() {
  return <ShopClient />;
}
