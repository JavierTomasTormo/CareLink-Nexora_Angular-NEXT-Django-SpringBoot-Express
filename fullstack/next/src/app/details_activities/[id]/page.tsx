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
  themeColor: '#ffffff'
};

export const metadata: Metadata = {
  title: 'VitalNest | Activity Details',
  description: 'Detailed view of the selected activity including images, description, and other relevant information.',
  keywords: 'activity details, elderly care activities, rehabilitation services, outdoor activities, relaxation therapy, educational programs, senior care',
  openGraph: {
    title: 'VitalNest | Activity Details',
    description: 'Discover detailed information about the selected activity at VitalNest',
    type: 'website',
    url: 'https://vitalnest.com/details_activities',
    siteName: 'VitalNest',
  },
  robots: 'index, follow',
};

// export default async function ActivityDetailsPage({ params }: { params: { id: string } }) {
//   const { id } = params;
//   return <ActivityDetailsClient activityId={id} />;
// }

export default async function Page({ params }: Props) {
  return <ActivityDetailsClient activityId={params.id} />;
}