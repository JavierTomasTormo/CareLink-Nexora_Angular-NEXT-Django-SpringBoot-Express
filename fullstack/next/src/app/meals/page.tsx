import type { Metadata, Viewport } from 'next';
import MealsClient from '@/components/meals/MealsClient';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'CareLink by Nexora | Planes Nutricionales',
  description: 'Sistema de gestión de dietas y planes nutricionales para residencias geriátricas. Control de alergias, dietas terapéuticas y opciones personalizadas para cada residente.',
  keywords: 'planes nutricionales, dietas terapéuticas, nutrición geriátrica, control alimenticio, CareLink, Nexora, gestión residencial',
  openGraph: {
    title: 'CareLink by Nexora | Planes Nutricionales',
    description: 'Gestión avanzada de dietas y planes nutricionales para residencias geriátricas',
    type: 'website',
    siteName: 'CareLink by Nexora',
  },
  robots: 'index, follow',
  authors: [{ name: 'Nexora Technologies' }],
  category: 'Healthcare Technology'
};

export default function MealsPage() {
  return <MealsClient />;
}

// import type { Metadata, Viewport } from 'next';
// import MealsClient from '@/components/meals/MealsClient';

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1
// };

// export const metadata: Metadata = {
//   title: 'VitalNest | Meal Plans & Dishes',
//   description: 'Explore our diverse selection of healthy meals, from breakfast to dinner. Custom meal plans, dietary options, and nutritious dishes tailored to your needs.',
//   keywords: 'healthy meals, meal plans, diet food, breakfast, lunch, dinner, nutrition, dietary options',
//   openGraph: {
//     title: 'VitalNest | Meal Plans & Dishes',
//     description: 'Discover nutritious and delicious meals customized to your dietary preferences',
//     type: 'website',
//     siteName: 'VitalNest',
//   },
//   robots: 'index, follow',
//   authors: [{ name: 'VitalNest Team' }],
//   category: 'Food & Health'
// };

// export default function MealsPage() {
//   return <MealsClient />;
// }
