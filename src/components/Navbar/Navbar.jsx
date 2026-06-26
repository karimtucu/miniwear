import { useState } from "react";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";

// ============================================
// DATOS DE NAVEGACIÓN — modificá acá las secciones
// ============================================
const NAV_LINKS = [
  { label: "Bebés",      href: "/bebes",     submenu: ["0-3 meses", "3-6 meses", "6-12 meses", "1-2 años"] },
  { label: "Niñas",      href: "/ninas",     submenu: ["Remeras", "Vestidos", "Camperas", "Pantalones"] },
  { label: "Niños",      href: "/ninos",     submenu: ["Remeras", "Buzos", "Camperas", "Pantalones"] },
  { label: "Liquidación",href: "/liquidacion", submenu: [] },
  { label: "Novedades",  href: "/novedades", submenu: [] },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [cartCount]                   = useState(0); // conectar con contexto de carrito
  const [searchOpen, setSearchOpen]   = useState(false);
  const [loginOpen, setLoginOpen]     = useState(false); // controla el modal de login

  return (
    <header className="navbar">
      <div className="navbar__container container">

        {/* ── Logo ── */}
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">👕</span>
          <span className="navbar__logo-text">
            mini<strong>wear</strong>
          </span>
        </a>

        {/* ── Links desktop ── */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
              onMouseEnter={() => setActiveMenu(link.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a href={link.href} className="navbar__link">
                {link.label}
                {link.submenu.length > 0 && (
                  <span className="navbar__chevron">▾</span>
                )}
              </a>

              {/* Dropdown submenu */}
              {link.submenu.length > 0 && activeMenu === link.label && (
                <div className="navbar__dropdown">
                  {link.submenu.map((item) => (
                    <a
                      key={item}
                      href={`${link.href}/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className="navbar__dropdown-item"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ── Acciones ── */}
        <div className="navbar__actions">
          {/* Buscador */}
          <button
            className="navbar__action-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar"
          >
            🔍
          </button>

          {/* Favoritos */}
          <button className="navbar__action-btn" aria-label="Favoritos">
            🤍
          </button>

          {/* Iniciar sesión — abre el modal de login */}
          <button className="navbar__login-btn" onClick={() => setLoginOpen(true)}>
            Iniciar Sesión
          </button>

          {/* Carrito */}
          <button className="navbar__cart" aria-label="Carrito">
            🛍
            {cartCount > 0 && (
              <span className="navbar__cart-count">{cartCount}</span>
            )}
          </button>

          {/* Hamburguesa mobile */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ── Buscador expandido ── */}
      {searchOpen && (
        <div className="navbar__search-bar">
          <div className="container">
            <input
              type="text"
              placeholder="Buscá remeras, camperas, talles..."
              className="navbar__search-input"
              autoFocus
            />
            <button className="navbar__search-close" onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Menú mobile ── */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__mobile-link">
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-divider" />
          <button className="navbar__mobile-link navbar__mobile-login" onClick={() => { setLoginOpen(true); setMenuOpen(false); }}>
            Iniciar sesión
          </button>
          <a href="/favoritos" className="navbar__mobile-link">Favoritos</a>
        </div>
      )}
      {/* ── Modal de login (componente de mi compañero, convertido a React) ── */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}