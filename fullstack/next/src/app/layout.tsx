import Providers from "@/store/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/global.css";
import styles from "../styles/layout/Layout.module.css";
import AuthProvider from "@/providers/AuthProvider";
import '@fortawesome/fontawesome-free/css/all.min.css';

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: '#4CAF50'
};

export const metadata: Metadata = {
  title: 'VitalNest | Cuidado Geriátrico Especializado',
  description: 'Centro especializado en cuidados geriátricos personalizados, ofreciendo atención médica profesional y servicios de calidad para adultos mayores.',
  keywords: 'cuidado geriátrico, adultos mayores, atención médica, residencia geriátrica, cuidados especializados',
  authors: [{ name: 'VitalNest' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'VitalNest | Cuidado Geriátrico Especializado',
    description: 'Centro especializado en cuidados geriátricos personalizados',
    type: 'website',
    locale: 'es_ES',
  },
  robots: 'index, follow'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AuthProvider>
              <Header />
                <main className={styles.main}>{children}</main>
              <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
