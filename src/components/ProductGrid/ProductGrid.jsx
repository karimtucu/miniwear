import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import "./ProductGrid.css";

const MOCK_PRODUCTS = PRODUCTS;

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "ninas", label: "Niñas" },
  { id: "ninos", label: "Niños" },
  { id: "bebes", label: "Bebés" },
];

const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export default function ProductGrid({ title = "Productos destacados", maxItems = 8 }) {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filtered = MOCK_PRODUCTS
    .filter((p) => activeFilter === "todos" || p.category === activeFilter)
    .slice(0, maxItems);

  return (
    <section className="product-grid-section section-padding">
      <div className="container">

        {/* Header */}
        <div className="product-grid__header">
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{filtered.length} productos encontrados</p>
          </div>
          <div className="product-grid__filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${activeFilter === f.id ? "filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="product-grid__items">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Ver todos */}
        <div className="product-grid__footer">
          <Link to="/catalogo" className="product-grid__see-all">
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Tarjeta de producto — solo vista, sin compra ──
function ProductCard({ product }) {
  return (
    <div className="product-card">

      {/* Imagen */}
      <div className="product-card__img-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-card__img" />
        ) : (
          <div className="product-card__img-placeholder">
            <span>{product.emoji}</span>
          </div>
        )}

        {/* Badge: SOLO "Nuevo", sin descuentos */}
        <div className="product-card__badges">
          {product.isNew && <span className="badge badge--new">Nuevo</span>}
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>

        {/* Talles — solo lectura, no se pueden seleccionar */}
        <div className="product-card__sizes">
          {product.size.map((s) => (
            <span key={s} className="size-btn size-btn--readonly">
              {s}
            </span>
          ))}
        </div>

        {/* Precio */}
        <div className="product-card__price">
          <span className="product-card__price-current">{formatPrice(product.price)}</span>
        </div>

        {/* Botón → redirige al catálogo para comprar */}
        <Link to="/catalogo" className="product-card__add product-card__add-link">
          Ver en catálogo →
        </Link>
      </div>
    </div>
  );
}
