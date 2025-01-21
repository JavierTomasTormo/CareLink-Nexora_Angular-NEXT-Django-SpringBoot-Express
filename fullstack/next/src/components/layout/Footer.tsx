import styles from '@/styles/layout/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>VitalNest</h3>
          <p>Cuidando con amor y profesionalidad a nuestros mayores desde 2025.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Servicios</h3>
          <ul>
            <li><a href="#">Actividades Terapéuticas</a></li>
            <li><a href="#">Control Nutricional</a></li>
            <li><a href="#">Gestión de Medicamentos</a></li>
            <li><a href="#">Cuidados Especializados</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Enlaces Útiles</h3>
          <ul>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Programas de Actividades</a></li>
            <li><a href="#">Plan Nutricional</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <ul>
            <li className={styles.contactInfo}><span className={styles.contactIcon}>📞</span> 900 123 456</li>
            <li className={styles.contactInfo}><span className={styles.contactIcon}>📧</span> info@vitalnest.com</li>
            <li className={styles.contactInfo}><span className={styles.contactIcon}>📍</span> Avenida los Angeles 25</li>
            <li className={styles.contactInfo}><span className={styles.contactIcon}>🕒</span> 24/7 Atención</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2025 VitalNest. Todos los derechos reservados.</p>
        <p>Comprometidos con el bienestar y la calidad de vida de nuestros residentes</p>
      </div>
    </footer>
  );
};

export default Footer;