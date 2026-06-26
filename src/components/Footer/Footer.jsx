import "./Footer.css";

const FOOTER_LINKS = {
  "Tienda": [
    { label: "Bebés",       href: "/bebes" },
    { label: "Niñas",       href: "/ninas" },
    { label: "Niños",       href: "/ninos" },
    { label: "Liquidación", href: "/liquidacion" },
    { label: "Novedades",   href: "/novedades" },
  ],
  "Ayuda": [
    { label: "Guía de talles",       href: "/talles" },
    { label: "Envíos y tiempos",     href: "/envios" },
    { label: "Cambios y devoluciones", href: "/cambios" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Contacto",             href: "/contacto" },
  ],
  "Mi cuenta": [
    { label: "Iniciar sesión",  href: "/login" },
    { label: "Registrarme",     href: "/registro" },
    { label: "Mis pedidos",     href: "/pedidos" },
    { label: "Mis favoritos",   href: "/favoritos" },
    { label: "Mis datos",       href: "/perfil" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span>👕</span> mini<strong>wear</strong>
            </a>
            <p className="footer__tagline">
              Ropa infantil de calidad para bebés y niños de 0 a 14 años.
            </p>
            {/* Redes sociales */}
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Instagram">
                📸
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Facebook">
                👥
              </a>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="WhatsApp">
                💬
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} MiniWear. Todos los derechos reservados.
          </p>
          <div className="footer__legal">
            <a href="/privacidad" className="footer__legal-link">Privacidad</a>
            <a href="/terminos"   className="footer__legal-link">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
