import { useSearchParams, Link } from "react-router-dom";
import { searchProducts } from "../data/products";
import "./SearchResultsPage.css";

// ============================================
// PÁGINA DE RESULTADOS DE BÚSQUEDA
// Ruta: /buscar?q=remera
// ============================================

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query    = searchParams.get("q") || "";
  const results  = searchProducts(query);

  return (
    <main className="search-page section-padding">
      <div className="container">
        <h1 className="search-page__title">
          Resultados para: <span>"{query}"</span>
        </h1>
        <p className="search-page__count">
          {results.length} producto{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
        </p>

        {results.length === 0 ? (
          <div className="search-page__empty">
            <span className="search-page__empty-icon">😕</span>
            <p className="search-page__empty-text">El producto no existe o no fue encontrado.</p>
            <p className="search-page__empty-sub">
              Probá con otra palabra, o revisá que esté bien escrito.
            </p>
            <Link to="/" className="search-page__empty-link">Volver al inicio</Link>
          </div>
        ) : (
          <div className="search-page__grid">
            {results.map((p) => (
              <div key={p.id} className="search-page__card">
                <div className="search-page__card-img">
                  <span>{p.emoji}</span>
                </div>
                <p className="search-page__card-name">{p.name}</p>
                <p className="search-page__card-price">
                  ${p.price.toLocaleString("es-AR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
