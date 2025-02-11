import type { Metadata, Viewport } from 'next';
import MealsClient from '@/components/meals/MealsClient';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'VitalNest | Meal Plans & Dishes',
  description: 'Explore our diverse selection of healthy meals, from breakfast to dinner. Custom meal plans, dietary options, and nutritious dishes tailored to your needs.',
  keywords: 'healthy meals, meal plans, diet food, breakfast, lunch, dinner, nutrition, dietary options',
  openGraph: {
    title: 'VitalNest | Meal Plans & Dishes',
    description: 'Discover nutritious and delicious meals customized to your dietary preferences',
    type: 'website',
    siteName: 'VitalNest',
  },
  robots: 'index, follow',
  authors: [{ name: 'VitalNest Team' }],
  category: 'Food & Health'
};

export default function MealsPage() {
  return <MealsClient />;
}
