import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
import { SUBCATEGORIES, CATEGORY_LABELS } from "../../data/products";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
  { label: CATEGORY_LABELS.bebes, slug: "bebes", submenu: SUBCATEGORIES.bebes },
  { label: CATEGORY_LABELS.ninas, slug: "ninas", submenu: SUBCATEGORIES.ninas },
  { label: CATEGORY_LABELS.ninos, slug: "ninos", submenu: SUBCATEGORIES.ninos },
  { label: "Liquidación", slug: "liquidacion", submenu: [] },
  { label: "Novedades",   slug: "novedades",   submenu: [] },
];

const CLOSE_DELAY = 250;

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginOpen, setLoginOpen]     = useState(false);

  const closeTimer = useRef(null);
  const navigate   = useNavigate();

  // Contador real del carrito desde el contexto
  const { totalUnits } = useCart();

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
  };

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

              {link.submenu.length > 0 && activeMenu === link.label && (
                <div
                  className="navbar__dropdown"
                  onMouseEnter={() => handleEnter(link.label)}
                  onMouseLeave={handleLeave}
                >
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

          {/* Catálogo */}
          <Link to="/catalogo" className="navbar__login-btn">
            Catálogo
          </Link>

          {/* Iniciar sesión */}
          <button className="navbar__login-btn" onClick={() => setLoginOpen(true)}>
            Iniciar Sesión
          </button>

          {/* Carrito — muestra el contador real */}
          <Link to="/carrito" className="navbar__cart" aria-label="Carrito">
            🛍
            {totalUnits > 0 && (
              <span className="navbar__cart-count">{totalUnits}</span>
            )}
          </Link>

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
          <Link to="/catalogo" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Catálogo completo
          </Link>
          <Link to="/carrito" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            🛍 Carrito {totalUnits > 0 && `(${totalUnits})`}
          </Link>
          <button
            className="navbar__mobile-link navbar__mobile-login"
            onClick={() => { setLoginOpen(true); setMenuOpen(false); }}
          >
            Iniciar sesión
          </button>
        </div>
      )}

      {/* ── Modal de login ── */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
