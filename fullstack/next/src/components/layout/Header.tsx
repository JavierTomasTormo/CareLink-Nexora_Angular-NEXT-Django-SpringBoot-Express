import Link from 'next/link';
import styles from '@/styles/layout/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/home">
            <h1>VitalNest</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/home" className={styles.navLink}>
                <span>Página Principal</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/shop" className={styles.navLink}>
                <span>Actividades</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;