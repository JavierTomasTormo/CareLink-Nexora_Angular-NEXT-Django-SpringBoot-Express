import styles from '../../styles/layout/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <Image 
            src="/Logo_VitalNest.png" 
            alt="VitalNest" 
            width={200} 
            height={150} 
            className={styles.logo}
          />
          <p className={styles.brandText}>
            Elevando los estándares del cuidado geriátrico con elegancia y dedicación desde 2025.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIconWrapper}>
              <FaFacebookF />
            </a>
            <a href="#" className={styles.socialIconWrapper}>
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialIconWrapper}>
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialIconWrapper}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.linkColumn}>
            <h3>Servicios Premium</h3>
            <ul>
              <li><Link href="/servicios/lujo">Suites de Lujo</Link></li>
              <li><Link href="/servicios/spa">Spa & Bienestar</Link></li>
              <li><Link href="/servicios/gastronomia">Alta Gastronomía</Link></li>
              <li><Link href="/servicios/terapias">Terapias Exclusivas</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3>Experiencia VitalNest</h3>
            <ul>
              <li><Link href="/instalaciones">Instalaciones</Link></li>
              <li><Link href="/eventos">Eventos Especiales</Link></li>
              <li><Link href="/galeria">Galería</Link></li>
              <li><Link href="/testimonios">Testimonios</Link></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h3>Contacto Directo</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MdPhone className={styles.contactIcon}/>
                <span>900 123 456</span>
              </div>
              <div className={styles.contactItem}>
                <MdEmail className={styles.contactIcon}/>
                <span>concierge@vitalnest.com</span>
              </div>
              <div className={styles.contactItem}>
                <MdLocationOn className={styles.contactIcon}/>
                <span>Paseo de la Castellana 200, Madrid</span>
              </div>
              <div className={styles.contactItem}>
                <MdAccessTime className={styles.contactIcon}/>
                <span>Atención Personalizada 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <p>© 2025 VitalNest - La excelencia en el cuidado</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacidad">Política de Privacidad</Link>
            <Link href="/terminos">Términos de Servicio</Link>
            <Link href="/cookies">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import styles from '../../styles/layout/Footer.module.css';

// const Footer: React.FC = () => {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.footerContent}>
//         <div className={styles.footerSection}>
//           <h3>VitalNest</h3>
//           <p>Cuidando con amor y profesionalidad a nuestros mayores desde 2025.</p>
//         </div>
//         <div className={styles.footerSection}>
//           <h3>Servicios</h3>
//           <ul>
//             <li><a href="#">Actividades Terapéuticas</a></li>
//             <li><a href="#">Control Nutricional</a></li>
//             <li><a href="#">Gestión de Medicamentos</a></li>
//             <li><a href="#">Cuidados Especializados</a></li>
//           </ul>
//         </div>
//         <div className={styles.footerSection}>
//           <h3>Enlaces Útiles</h3>
//           <ul>
//             <li><a href="#">Sobre Nosotros</a></li>
//             <li><a href="#">Programas de Actividades</a></li>
//             <li><a href="#">Plan Nutricional</a></li>
//             <li><a href="#">Contacto</a></li>
//           </ul>
//         </div>
//         <div className={styles.footerSection}>
//           <h3>Contacto</h3>
//           <ul>
//             <li className={styles.contactInfo}><span className={styles.contactIcon}>📞</span> 900 123 456</li>
//             <li className={styles.contactInfo}><span className={styles.contactIcon}>📧</span> info@vitalnest.com</li>
//             <li className={styles.contactInfo}><span className={styles.contactIcon}>📍</span> Avenida los Angeles 25</li>
//             <li className={styles.contactInfo}><span className={styles.contactIcon}>🕒</span> 24/7 Atención</li>
//           </ul>
//         </div>
//       </div>
//       <div className={styles.bottomBar}>
//         <p>© 2025 VitalNest. Todos los derechos reservados.</p>
//         <p>Comprometidos con el bienestar y la calidad de vida de nuestros residentes</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;