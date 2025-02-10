import Providers from "@/store/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/global.css";
import styles from "../styles/layout/Layout.module.css";
import AuthProvider from "@/providers/AuthProvider";

import '@fortawesome/fontawesome-free/css/all.min.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VitalNest | Cuidado Geriátrico Especializado',
  description: 'Centro de cuidado geriátrico especializado con servicios profesionales las 24 horas. Ofrecemos atención personalizada, monitoreo médico y ambiente familiar para nuestros adultos mayores.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: ['cuidado geriátrico', 'adultos mayores', 'residencia tercera edad', 'atención médica', 'VitalNest'],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: 'VitalNest | Cuidado Geriátrico Especializado',
    description: 'Centro de cuidado geriátrico con atención profesional 24/7',
    type: 'website',
    locale: 'es_ES',
    siteName: 'VitalNest'
  }
}

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
