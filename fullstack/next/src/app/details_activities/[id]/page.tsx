import type { Metadata, Viewport } from 'next';
import ActivityDetailsClient from '@/components/details/details_activity/ActivityDetailsClient';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0078D7'
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `CareLink by Nexora | Detalle de Actividad ${params.id}`,
    description: 'Información detallada sobre actividades terapéuticas y servicios geriátricos disponibles en la plataforma CareLink by Nexora.',
    keywords: 'actividades terapéuticas, servicios geriátricos, CareLink, Nexora, detalle actividad, terapia ocupacional',
    openGraph: {
      title: `CareLink by Nexora | Detalle de Actividad ${params.id}`,
      description: 'Información detallada sobre actividades y servicios disponibles en la plataforma CareLink',
      type: 'website',
      url: `https://carelink.nexora.com/details_activities/${params.id}`,
      siteName: 'CareLink by Nexora',
    },
    robots: 'index, follow',
  };
};

export default async function Page({ params }: Props) {
  return <ActivityDetailsClient activityId={params.id} />;
}

