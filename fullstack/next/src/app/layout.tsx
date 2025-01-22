import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../styles/global.css';
import styles from '../styles/layout/Layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
