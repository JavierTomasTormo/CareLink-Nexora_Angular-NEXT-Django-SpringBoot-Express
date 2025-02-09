'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/layout/Header.module.css';
import { SHARED_ROUTES } from '@/store/Constants';
import { isAuthenticated, logout, authListener } from '../../utils/auth';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    const cleanup = authListener((newAuthState) => {
      setIsAuth(newAuthState);
    });
    return cleanup;
  }, []);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={SHARED_ROUTES.NEXT.HOME}>
            <img src="/Logo_VitalNest.png" alt="VitalNest Logo" />
          </Link>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href={SHARED_ROUTES.NEXT.HOME} className={styles.navLink}>
                Página Principal
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`${SHARED_ROUTES.NEXT.SHOP}?activity_type=1`} className={styles.navLink}>
                Actividades
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`${SHARED_ROUTES.NEXT.MEALS}?type_meal=1`} className={styles.navLink}>
                Menús
              </Link>
            </li>
            {!isAuth ? (
              <li className={styles.navItem}>
                <Link
                  href={SHARED_ROUTES.ANGULAR.AUTH.LOGIN}
                  className={`${styles.navLink} ${styles.authButton}`}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className={styles.navItem}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    setIsAuth(false); 
                  }}
                  className={`${styles.navLink} ${styles.authButton}`}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

