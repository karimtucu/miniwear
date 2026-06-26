<<<<<<< HEAD
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
import { SUBCATEGORIES, CATEGORY_LABELS } from "../../data/products";

// ============================================
// DATOS DE NAVEGACIÓN
// "slug" es el segmento de la URL: /bebes, /ninas, /ninos, /liquidacion, /novedades
// "submenu" se construye automáticamente desde SUBCATEGORIES para bebés/niñas/niños.
// Liquidación y Novedades no tienen submenú.
// ============================================
const NAV_LINKS = [
  { label: CATEGORY_LABELS.bebes, slug: "bebes", submenu: SUBCATEGORIES.bebes },
  { label: CATEGORY_LABELS.ninas, slug: "ninas", submenu: SUBCATEGORIES.ninas },
  { label: CATEGORY_LABELS.ninos, slug: "ninos", submenu: SUBCATEGORIES.ninos },
  { label: "Liquidación", slug: "liquidacion", submenu: [] },
  { label: "Novedades",   slug: "novedades",   submenu: [] },
];

// Cuánto se espera (en ms) antes de cerrar el dropdown al salir con el mouse.
// Esto es lo que arregla el bug de "se cierra muy rápido": le da tiempo a la
// persona de mover el mouse en diagonal hacia el submenú sin que se cierre.
const CLOSE_DELAY = 250;

=======
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

>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [cartCount]                   = useState(0); // conectar con contexto de carrito
  const [searchOpen, setSearchOpen]   = useState(false);
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState("");
  const [loginOpen, setLoginOpen]     = useState(false);

  const closeTimer = useRef(null);
  const navigate    = useNavigate();

  // Abre el submenú y cancela cualquier cierre pendiente
  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  // Cierra el submenú con un pequeño retraso (evita el cierre brusco)
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
  };

  // Búsqueda: navega a /buscar?q=...
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };
=======
  const [loginOpen, setLoginOpen]     = useState(false); // controla el modal de login
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d

  return (
    <header className="navbar">
      <div className="navbar__container container">

        {/* ── Logo ── */}
<<<<<<< HEAD
        <Link to="/" className="navbar__logo">
=======
        <a href="/" className="navbar__logo">
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
          <span className="navbar__logo-icon">👕</span>
          <span className="navbar__logo-text">
            mini<strong>wear</strong>
          </span>
<<<<<<< HEAD
        </Link>
=======
        </a>
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d

        {/* ── Links desktop ── */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
<<<<<<< HEAD
              onMouseEnter={() => handleEnter(link.label)}
              onMouseLeave={handleLeave}
            >
              <Link to={`/${link.slug}`} className="navbar__link">
=======
              onMouseEnter={() => setActiveMenu(link.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a href={link.href} className="navbar__link">
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
                {link.label}
                {link.submenu.length > 0 && (
                  <span className="navbar__chevron">▾</span>
                )}
<<<<<<< HEAD
              </Link>

              {/* Dropdown submenu */}
              {link.submenu.length > 0 && activeMenu === link.label && (
                <div
                  className="navbar__dropdown"
                  onMouseEnter={() => handleEnter(link.label)}
                  onMouseLeave={handleLeave}
                >
                  {/* Puente invisible que conecta el link con el dropdown,
                      así el mouse nunca "sale" del área activa al bajar */}
                  <div className="navbar__dropdown-bridge" />
                  {link.submenu.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/${link.slug}/${item.slug}`}
                      className="navbar__dropdown-item"
                      onClick={() => setActiveMenu(null)}
                    >
                      {item.label}
                    </Link>
=======
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
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
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

<<<<<<< HEAD
          {/* Favoritos <button className="navbar__action-btn" aria-label="Favoritos">
            🤍
          </button> */}
         
=======
          {/* Favoritos */}
          <button className="navbar__action-btn" aria-label="Favoritos">
            🤍
          </button>
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d

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
<<<<<<< HEAD
          <form className="container navbar__search-form" onSubmit={handleSearchSubmit}>
=======
          <div className="container">
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
            <input
              type="text"
              placeholder="Buscá remeras, camperas, talles..."
              className="navbar__search-input"
<<<<<<< HEAD
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="navbar__search-submit" aria-label="Buscar">
              🔍
            </button>
            <button type="button" className="navbar__search-close" onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </form>
=======
              autoFocus
            />
            <button className="navbar__search-close" onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </div>
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
        </div>
      )}

      {/* ── Menú mobile ── */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
<<<<<<< HEAD
            <div key={link.label} className="navbar__mobile-group">
              <Link
                to={`/${link.slug}`}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {/* En mobile no hay hover, así que mostramos las subcategorías
                  siempre visibles debajo de cada sección */}
              {link.submenu.length > 0 && (
                <div className="navbar__mobile-submenu">
                  {link.submenu.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/${link.slug}/${item.slug}`}
                      className="navbar__mobile-sublink"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
=======
            <a key={link.label} href={link.href} className="navbar__mobile-link">
              {link.label}
            </a>
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
          ))}
          <div className="navbar__mobile-divider" />
          <button className="navbar__mobile-link navbar__mobile-login" onClick={() => { setLoginOpen(true); setMenuOpen(false); }}>
            Iniciar sesión
          </button>
<<<<<<< HEAD
          <Link to="/favoritos" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Favoritos
          </Link>
        </div>
      )}

      {/* ── Modal de login ── */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
=======
          <a href="/favoritos" className="navbar__mobile-link">Favoritos</a>
        </div>
      )}
      {/* ── Modal de login (componente de mi compañero, convertido a React) ── */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
