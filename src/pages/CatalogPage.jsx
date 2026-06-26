// ============================================
// CATALOG PAGE — Catálogo completo con filtros
// Ruta: /catalogo
// ============================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import "./CatalogPage.css";

const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

const CATEGORY_FILTERS = [
  { id: "todos",  label: "Todos" },
  { id: "bebes",  label: "🍼 Bebés" },
  { id: "ninas",  label: "🦋 Niñas" },
  { id: "ninos",  label: "⚽ Niños" },
];

const ORDER_OPTIONS = [
  { id: "default",    label: "Destacados" },
  { id: "price-asc",  label: "Menor precio" },
  { id: "price-desc", label: "Mayor precio" },
  { id: "new",        label: "Novedades" },
];

export default function CatalogPage() {
  const [category, setCategory]         = useState("todos");
  const [order, setOrder]               = useState("default");
  const [onlyDiscount, setOnlyDiscount] = useState(false);

  // Con descuento activo → siempre vacío por ahora (próximamente)
  const filtered = onlyDiscount
    ? []
    : PRODUCTS
        .filter((p) => category === "todos" || p.category === category)
        .sort((a, b) => {
          if (order === "price-asc")  return a.price - b.price;
          if (order === "price-desc") return b.price - a.price;
          if (order === "new")        return b.isNew - a.isNew;
          return a.id - b.id;
        });

  return (
    <main className="catalog-page section-padding">
      <div className="container">

        {/* Encabezado */}
        <div className="catalog-page__header">
          <div>
            <h1 className="section-title">Catálogo completo</h1>
            <p className="section-subtitle">
              {onlyDiscount ? "Próximamente" : `${filtered.length} productos`}
            </p>
          </div>

          {/* Ordenar */}
          <div className="catalog-page__order">
            <label className="catalog-page__order-label">Ordenar por:</label>
            <select
              className="catalog-page__select"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              disabled={onlyDiscount}
            >
              {ORDER_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtros de categoría */}
        <div className="catalog-page__filters">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-chip ${category === f.id && !onlyDiscount ? "filter-chip--active" : ""}`}
              onClick={() => { setCategory(f.id); setOnlyDiscount(false); }}
            >
              {f.label}
            </button>
          ))}

          <button
            className={`filter-chip filter-chip--discount ${onlyDiscount ? "filter-chip--active" : ""}`}
            onClick={() => setOnlyDiscount((v) => !v)}
          >
            🏷 Con descuento
          </button>
        </div>

        {/* Con descuento activado — mensaje próximamente */}
        {onlyDiscount ? (
          <div className="catalog-page__coming-soon">
            <span>🏷️</span>
            <p className="catalog-page__coming-title">Descuentos próximamente</p>
            <p className="catalog-page__coming-text">
              Estamos preparando ofertas increíbles. ¡Volvé pronto!
            </p>
            <button
              className="catalog-page__coming-btn"
              onClick={() => setOnlyDiscount(false)}
            >
              Ver todos los productos
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="catalog-page__empty">
            <span>😕</span>
            <p>No hay productos con esos filtros.</p>
            <button onClick={() => setCategory("todos")}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="catalog-page__grid">
            {filtered.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ── Tarjeta del catálogo ──
function CatalogCard({ product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="catalog-card">
      <div className="catalog-card__img">
        <span>{product.emoji}</span>
        <div className="catalog-card__badges">
          {product.isNew && <span className="badge badge--new">Nuevo</span>}
        </div>
      </div>

      <div className="catalog-card__body">
        <p className="catalog-card__category">
          {product.category === "bebes" ? "Bebés" : product.category === "ninas" ? "Niñas" : "Niños"}
        </p>
        <h3 className="catalog-card__name">{product.name}</h3>

        <div className="catalog-card__prices">
          <span className="catalog-card__price">{formatPrice(product.price)}</span>
        </div>

        <div className="catalog-card__sizes">
          {product.size.map((s) => (
            <button
              key={s}
              className={`size-chip ${selectedSize === s ? "size-chip--active" : ""}`}
              onClick={() => setSelectedSize(s === selectedSize ? null : s)}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          className={`catalog-card__add ${added ? "catalog-card__add--done" : ""} ${!selectedSize ? "catalog-card__add--disabled" : ""}`}
          onClick={handleAdd}
          disabled={added}
        >
          {added ? "✓ Agregado" : !selectedSize ? "Elegí un talle" : "Agregar al carrito 🛍"}
        </button>
      </div>
    </div>
  );
}
