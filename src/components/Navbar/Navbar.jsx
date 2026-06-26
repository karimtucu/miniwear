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

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [cartCount]                   = useState(0); // conectar con contexto de carrito
  const [searchOpen, setSearchOpen]   = useState(false);
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

  return (
    <header className="navbar">
      <div className="navbar__container container">

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">👕</span>
          <span className="navbar__logo-text">
            mini<strong>wear</strong>
          </span>
        </Link>

        {/* ── Links desktop ── */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
              onMouseEnter={() => handleEnter(link.label)}
              onMouseLeave={handleLeave}
            >
              <Link to={`/${link.slug}`} className="navbar__link">
                {link.label}
                {link.submenu.length > 0 && (
                  <span className="navbar__chevron">▾</span>
                )}
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

          {/* Favoritos <button className="navbar__action-btn" aria-label="Favoritos">
            🤍
          </button> */}
         

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
          <form className="container navbar__search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscá remeras, camperas, talles..."
              className="navbar__search-input"
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
        </div>
      )}

      {/* ── Menú mobile ── */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
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
          ))}
          <div className="navbar__mobile-divider" />
          <button className="navbar__mobile-link navbar__mobile-login" onClick={() => { setLoginOpen(true); setMenuOpen(false); }}>
            Iniciar sesión
          </button>
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
