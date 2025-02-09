import Providers from "@/store/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/global.css";
import styles from "../styles/layout/Layout.module.css";
import AuthProvider from "@/providers/AuthProvider";

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
