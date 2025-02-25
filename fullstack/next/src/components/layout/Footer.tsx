import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import styles from '../../styles/layout/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      {/* <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C320,80 520,80 720,40 C920,0 1120,0 1440,80 L1440,120 L0,120 Z" fill="currentColor"/>
        </svg>
      </div>       */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            {/* Columna 1: Logo y descripción */}
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <Image 
                  src="/Logo_VitalNest.png" 
                  alt="VitalNest Logo" 
                  width={180} 
                  height={180} 
                  priority
                />
              </div>
              <p className={styles.brandText}>
                Elevando los estándares del cuidado geriátrico con elegancia y dedicación. Un espacio donde el bienestar y la calidad de vida se fusionan para crear experiencias excepcionales.
              </p>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIconWrapper} aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className={styles.socialIconWrapper} aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className={styles.socialIconWrapper} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialIconWrapper} aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#" className={styles.socialIconWrapper} aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            {/* Columna 2: Enlaces */}
            <div className={styles.footerNavigation}>
              <div className={styles.linkColumn}>
                <h3>Servicios</h3>
                <ul>
                  <li><Link href="/servicios/residencia">Residencia Premium</Link></li>
                  <li><Link href="/servicios/cuidados">Cuidados Especializados</Link></li>
                  <li><Link href="/servicios/actividades">Programa de Actividades</Link></li>
                  <li><Link href="/servicios/gastronomia">Gastronomía Saludable</Link></li>
                </ul>
              </div>

              <div className={styles.linkColumn}>
                <h3>Sobre Nosotros</h3>
                <ul>
                  <li><Link href="/sobre-nosotros">Quiénes Somos</Link></li>
                  <li><Link href="/instalaciones">Instalaciones</Link></li>
                  <li><Link href="/equipo">Equipo Profesional</Link></li>
                  <li><Link href="/blog">Blog de Salud</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Columna 3: Contacto */}
            <div className={styles.footerContact}>
              <h3>Contacto</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <MdPhone className={styles.contactIcon}/>
                  <span>900 123 456</span>
                </div>
                <div className={styles.contactItem}>
                  <MdEmail className={styles.contactIcon}/>
                  <span>info@vitalnest.com</span>
                </div>
                <div className={styles.contactItem}>
                  <MdLocationOn className={styles.contactIcon}/>
                  <span>Paseo de la Castellana 200, Madrid</span>
                </div>
                <div className={styles.contactItem}>
                  <MdAccessTime className={styles.contactIcon}/>
                  <span>Atención 24/7</span>
                </div>
              </div>
              
              <div className={styles.newsletterContainer}>
                <h3>Boletín Informativo</h3>
                <form className={styles.newsletterForm}>
                  <input type="email" placeholder="Tu correo electrónico" required />
                  <button type="submit">Suscribirse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© {currentYear} VitalNest - Todos los derechos reservados</p>
            <div className={styles.bottomLinks}>
              <Link href="/privacidad">Política de Privacidad</Link>
              <Link href="/terminos">Términos de Uso</Link>
              <Link href="/cookies">Política de Cookies</Link>
              <Link href="/accesibilidad">Accesibilidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;