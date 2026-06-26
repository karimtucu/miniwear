import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <span className="not-found__emoji">🧸</span>
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">¡Ups! Esta página se perdió</h2>
        <p className="not-found__text">
          La página que buscás no existe o todavía está en construcción.
        </p>
        <Link to="/" className="not-found__btn">Volver al inicio</Link>
      </div>
    </main>
  );
}