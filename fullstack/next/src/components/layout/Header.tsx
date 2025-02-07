'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/layout/Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/home">
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
              <Link href="/home" className={styles.navLink}>
                Página Principal
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/shop?activity_type=1" className={styles.navLink}>
                Actividades
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/meals?type_meal=1" className={styles.navLink}>
                Menús
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
