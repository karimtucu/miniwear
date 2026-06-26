import { useState } from "react";
import { PRODUCTS } from "../../data/products";
import "./ProductGrid.css";

// ============================================
// PRODUCTOS — ahora vienen de src/data/products.js
// (fuente compartida con las páginas de categoría)
// ============================================
const MOCK_PRODUCTS = PRODUCTS;

const FILTERS = [
  { id: "todos",  label: "Todos" },
  { id: "ninas",  label: "Niñas" },
  { id: "ninos",  label: "Niños" },
  { id: "bebes",  label: "Bebés" },
];

// Formateador de precio en pesos argentinos
const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

export default function ProductGrid({ title = "Productos destacados", maxItems = 8 }) {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [wishlist, setWishlist]         = useState([]);

  const filtered = MOCK_PRODUCTS
    .filter((p) => activeFilter === "todos" || p.category === activeFilter)
    .slice(0, maxItems);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="product-grid-section section-padding">
      <div className="container">

        {/* Header */}
        <div className="product-grid__header">
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{filtered.length} productos encontrados</p>
          </div>
          {/* Filtros */}
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
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>

        {/* Ver todos */}
        <div className="product-grid__footer">
          <a href="/catalogo" className="product-grid__see-all">
            Ver todo el catálogo →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Tarjeta de producto individual ──
function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded]               = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return; // validar talle seleccionado
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // TODO: conectar con CartContext
  };

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

        {/* Badges */}
        <div className="product-card__badges">
          {product.isNew      && <span className="badge badge--new">Nuevo</span>}
          {product.discount > 0 && <span className="badge badge--off">{product.discount}% OFF</span>}
        </div>

        {/* Wishlist */}
        <button
          className={`product-card__wish ${isWishlisted ? "product-card__wish--active" : ""}`}
          onClick={onToggleWishlist}
          aria-label="Agregar a favoritos"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>

        {/* Talles */}
        <div className="product-card__sizes">
          {product.size.map((s) => (
            <button
              key={s}
              className={`size-btn ${selectedSize === s ? "size-btn--active" : ""}`}
              onClick={() => setSelectedSize(s === selectedSize ? null : s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Precio */}
        <div className="product-card__price">
          <span className="product-card__price-current">
            {product.price > 0 ? formatPrice(product.price) : "Consultar"}
          </span>
          {product.price > 0 && product.originalPrice && (
            <span className="product-card__price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* CTA */}
        <button
          className={`product-card__add ${added ? "product-card__add--done" : ""} ${!selectedSize ? "product-card__add--disabled" : ""}`}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? "✓ Agregado" : !selectedSize ? "Elegí un talle" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
