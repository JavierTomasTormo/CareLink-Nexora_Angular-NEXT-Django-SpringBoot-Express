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
  themeColor: '#0078D7' 
};

export const metadata: Metadata = {
  title: 'CareLink by Nexora | Gestión Integral de Residencias',
  description: 'Sistema integral de gestión para residencias de ancianos. Optimiza el cuidado de mayores con control de medicación, dietas personalizadas y seguimiento médico.',
  keywords: 'CareLink, Nexora, gestión residencias, cuidado geriátrico, control medicación, seguimiento médico, gestión residencial',
  authors: [{ name: 'Nexora Technologies' }],
  openGraph: {
    title: 'CareLink by Nexora | Gestión Integral de Residencias',
    description: 'Sistema integral de gestión para residencias de ancianos desarrollado por Nexora Technologies',
    type: 'website',
    locale: 'es_ES',
    siteName: 'CareLink by Nexora',
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
