'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/layout/Header.module.css';
import { SHARED_ROUTES, UserData,  DEFAULT_USER } from '@/store/Constants';
import { isAuthenticated, logout, authListener, getUserInfo } from '../../utils/auth';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);



  useEffect(() => {
    setIsAuth(isAuthenticated());
      const userInfo = getUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
      const cleanup = authListener((newAuthState) => {
        setIsAuth(newAuthState);
      });
    return cleanup;
  }, []);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
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
              <li className={`${styles.navItem} ${styles.profileContainer}`}>
                <div className={styles.profileTrigger} onClick={toggleProfileMenu}>
                  {user?.profile_img ? (
                    <img 
                      src={user.profile_img} 
                      alt="Profile" 
                      className={styles.profileImage}
                    />
                  ) : (
                    <i className={`fas fa-user ${styles.profileIcon}`}></i>
                  )}
                </div>

                <div className={`${styles.profileDropdown} ${profileMenuOpen ? styles.show : ''}`}>
                  <div className={styles.profileHeader}>
                    {user?.profile_img ? (
                      <img 
                        src={user.profile_img} 
                        alt="Profile" 
                        className={styles.dropdownProfileImage}
                      />
                    ) : (
                      <i className={`fas fa-user ${styles.profileIcon}`}></i>
                    )}
                    <div className={styles.profileInfo}>
                      <p className={styles.profileName}>{user?.name}</p>
                      <p className={styles.profileEmail}>{user?.email}</p>
                    </div>
                  </div>
                  <div className={styles.profileMenu}>
                    <Link 
                      href={SHARED_ROUTES.ANGULAR.AUTH.PROFILE} 
                      className={styles.profileLink}
                    >
                      <i className="fas fa-user"></i> Mi Perfil
                    </Link>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = SHARED_ROUTES.ANGULAR.AUTH.LOGOUT;
                      }} 
                      className={`${styles.profileLink} ${styles.logout}`}
                    >
                      <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </a>
                  </div>
                </div>
              </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

