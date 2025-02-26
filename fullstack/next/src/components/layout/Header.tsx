'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../styles/layout/Header.module.css';
import { SHARED_ROUTES, UserData,  DEFAULT_USER } from '@/store/Constants';
import { isAuthenticated, authListener, getUserInfo } from '../../utils/auth';
import Image from 'next/image';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // const generateBreadcrumbs = () => {
  //   if (pathname === '/' || pathname === '/home') return [];
    
  //   const paths = pathname.split('/').filter(p => p);
  //   let breadcrumbs = [{ path: '/home', label: 'Inicio' }];
    
  //   let currentPath = '';
  //   paths.forEach((path, i) => {
  //     currentPath += `/${path}`;
  //     let label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      
  //     // Mapeo especial para rutas
  //     if (path === 'shop') label = 'Actividades';
  //     if (path === 'meals') label = 'Menús';
      
  //     breadcrumbs.push({ path: currentPath, label });
  //   });
    
  //   return breadcrumbs;
  // };

  // const breadcrumbs = generateBreadcrumbs();

  useEffect(() => {
    setIsAuth(isAuthenticated());
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
    const cleanup = authListener((newAuthState) => {
      setIsAuth(newAuthState);
    });
    
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      cleanup();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log(`Buscando: ${searchQuery}`);
    setSearchOpen(false);
  };

  const isActive = (path: string) => {
    if (path === SHARED_ROUTES.NEXT.HOME) {
      return pathname === SHARED_ROUTES.NEXT.HOME || pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('auth_token');
    window.location.href = SHARED_ROUTES.NEXT.HOME;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.container}>
            {/* Logo a la izquierda */}
            <div className={styles.logoContainer}>
              <Link href={SHARED_ROUTES.NEXT.HOME}>
                <div className={styles.logo}>
                  <Image 
                    src="/Logo_VitalNest.png" 
                    alt="CareLink by Nexora" 
                    width={100} height={100}  
                    priority={true} 
                    // priority={false}
                    // loading="lazy"   
                  />
                </div>
              </Link>
            </div>
            
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
            
            {/* Navegación centrada */}
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link 
                    href={SHARED_ROUTES.NEXT.HOME} 
                    className={`${styles.navLink} ${isActive(SHARED_ROUTES.NEXT.HOME) ? styles.active : ''}`}
                  >
                    Inicio
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link 
                    href={`${SHARED_ROUTES.NEXT.SHOP}?activity_type=1`} 
                    className={`${styles.navLink} ${isActive(SHARED_ROUTES.NEXT.SHOP) ? styles.active : ''}`}
                  >
                    Actividades
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link 
                    href={`${SHARED_ROUTES.NEXT.MEALS}?type_meal=1`} 
                    className={`${styles.navLink} ${isActive(SHARED_ROUTES.NEXT.MEALS) ? styles.active : ''}`}
                  >
                    Menús
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Búsqueda e iniciar sesión a la derecha */}
            <div className={styles.navActions}>
              <div ref={searchRef} className={styles.searchContainer}>
                <button 
                  className={styles.iconButton} 
                  onClick={toggleSearch}
                  aria-label="Buscar"
                >
                  <i className="fas fa-search"></i>
                </button>
                
                {searchOpen && (
                  <div className={styles.searchDropdown}>
                    <form onSubmit={handleSearch}>
                      <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar..." 
                        autoFocus
                      />
                      <button type="submit" className={styles.iconButton}>
                        <i className="fas fa-search"></i>
                      </button>
                    </form>
                  </div>
                )}
              </div>
              
              {isAuth && (
                <div ref={notificationsRef} className={styles.notificationsContainer}>
                  <button 
                    className={`${styles.iconButton} ${styles.notificationBtn}`} 
                    onClick={toggleNotifications}
                    aria-label="Notificaciones"
                  >
                    <i className="fas fa-bell"></i>
                  </button>
                  
                  {notificationsOpen && (
                    <div className={styles.notificationsDropdown}>
                      {/* Contenido de notificaciones */}
                    </div>
                  )}
                </div>
              )}
              
              {!isAuth ? (
                <Link 
                  href={SHARED_ROUTES.ANGULAR.AUTH.LOGIN} 
                  className={styles.authButton}
                >
                  <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                </Link>
              ) : (
                    <div ref={profileRef} className={styles.profileContainer}>
                      <button onClick={toggleProfileMenu} className={styles.profileTrigger}>
                        {user.profile_img ? (
                          <Image 
                            src={user.profile_img} 
                            alt={user.name} 
                            width={40} 
                            height={40} 
                            className={styles.profileImage}
                          />
                        ) : (
                          <div className={styles.profileInitials}>
                            {user.name?.charAt(0)}
                          </div>
                        )}
                      </button>

                      {profileMenuOpen && (
                        <div className={styles.profileDropdown}>
                          <div className={styles.profileHeader}>
                            <div className={styles.profileInitials + ' ' + styles.large}>
                              {user.name?.charAt(0)}
                            </div>
                            <div className={styles.profileInfo}>
                              <h4 className={styles.profileName}>{user.name}</h4>
                              <p className={styles.profileEmail}>{user.email}</p>
                              <span className={styles.userRole}>Administrador</span>
                            </div>
                          </div>

                          <div className={styles.profileMenu}>
                            <Link href="/perfil" className={styles.profileLink}>
                              <i className="fas fa-user"></i>
                              Mi Perfil
                            </Link>
                            
                            <Link href="/ajustes" className={styles.profileLink}>
                              <i className="fas fa-cog"></i>
                              Ajustes
                            </Link>
                            
                            <Link href="/actividad" className={styles.profileLink}>
                              <i className="fas fa-chart-line"></i>
                              Actividad
                            </Link>

                            <hr className={styles.menuDivider} />

                            <Link href="/ayuda" className={styles.profileLink}>
                              <i className="fas fa-question-circle"></i>
                              Ayuda y Soporte
                            </Link>
                            
                            <Link href="/feedback" className={styles.profileLink}>
                              <i className="fas fa-comment-alt"></i>
                              Enviar Feedback
                            </Link>

                            <hr className={styles.menuDivider} />
                            
                            <button onClick={handleLogout} className={`${styles.profileLink} ${styles.logout}`}>
                              <i className="fas fa-sign-out-alt"></i>
                              Cerrar Sesión
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
              )}
            </div>
          </div>
        </div>
        
        {/* {breadcrumbs.length > 0 && (
          <div className={styles.breadcrumbContainer}>
            <div className={styles.container}>
              <nav aria-label="Breadcrumb">
                <ol className={styles.breadcrumbList}>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className={styles.breadcrumbItem}>
                      {index < breadcrumbs.length - 1 ? (
                        <Link href={crumb.path} className={styles.breadcrumbLink}>
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )} */}
      </header>
      <div className={styles.headerSpacer}></div>
    </>
  );
};

export default Header;