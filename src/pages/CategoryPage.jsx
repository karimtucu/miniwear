import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, SUBCATEGORIES, CATEGORY_LABELS } from "../data/products";
import "./CategoryPage.css";

// ============================================
// PÁGINA DE CATEGORÍA
// Ruta: /:category  o  /:category/:subcategory
// Ej: /ninas  ó  /ninas/vestidos
// ============================================

export default function CategoryPage() {
  const { category, subcategory } = useParams();

  const categoryLabel = CATEGORY_LABELS[category] || "Productos";
  const subcats        = SUBCATEGORIES[category] || [];
  const products       = getProductsByCategory(category, subcategory);

  const activeSubLabel = subcats.find((s) => s.slug === subcategory)?.label;

  return (
    <main className="category-page section-padding">
      <div className="container">

        {/* Breadcrumb simple */}
        <nav className="category-page__breadcrumb">
          <Link to="/">Inicio</Link>
          <span> / </span>
          <Link to={`/${category}`}>{categoryLabel}</Link>
          {activeSubLabel && (
            <>
              <span> / </span>
              <span>{activeSubLabel}</span>
            </>
          )}
        </nav>

        <h1 className="category-page__title">
          {activeSubLabel ? `${categoryLabel} · ${activeSubLabel}` : categoryLabel}
        </h1>

        {/* Chips de subcategorías */}
        {subcats.length > 0 && (
          <div className="category-page__subcats">
            <Link
              to={`/${category}`}
              className={`subcat-chip ${!subcategory ? "subcat-chip--active" : ""}`}
            >
              Todos
            </Link>
            {subcats.map((s) => (
              <Link
                key={s.slug}
                to={`/${category}/${s.slug}`}
                className={`subcat-chip ${subcategory === s.slug ? "subcat-chip--active" : ""}`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}

        {/* Resultado */}
        {products.length === 0 ? (
          <div className="category-page__empty">
            <span className="category-page__empty-icon">🔍</span>
            <p>No encontramos productos en esta sección todavía.</p>
            <Link to="/" className="category-page__empty-link">Volver al inicio</Link>
          </div>
        ) : (
          <div className="category-page__grid">
            {products.map((p) => (
              <div key={p.id} className="category-page__card">
                <div className="category-page__card-img">
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <span>{p.emoji}</span>
                  )}
                </div>
                <p className="category-page__card-name">{p.name}</p>
                <p className="category-page__card-price">
                  {p.price > 0 ? `$${p.price.toLocaleString("es-AR")}` : "Consultar"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
