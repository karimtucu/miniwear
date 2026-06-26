import { Link } from "react-router-dom";
import "./CategorySection.css";

// ============================================
// CATEGORÍAS — modificá acá nombre, color y emoji
// ============================================
const CATEGORIES = [
  {
    id: "bebes",
    label:    "Bebés",
    subtitle: "0 a 24 meses",
    href:     "/bebes",
    emoji:    "🍼",
    color:    "var(--color-rosa-light)",
    accent:   "var(--color-rosa-dark)",
  },
  {
    id: "ninas",
    label:    "Niñas",
    subtitle: "1 a 14 años",
    href:     "/ninas",
    emoji:    "🦋",
    color:    "var(--color-lavanda-light)",
    accent:   "#7B5EA7",
  },
  {
    id: "ninos",
    label:    "Niños",
    subtitle: "1 a 14 años",
    href:     "/ninos",
    emoji:    "⚽",
    color:    "var(--color-menta)",
    accent:   "var(--color-menta-dark)",
  },
  {
    id: "liquidacion",
    label:    "Liquidación",
    subtitle: "Hasta 40% OFF",
    href:     "/liquidacion",
    emoji:    "🏷",
    color:    "var(--color-amarillo)",
    accent:   "#A08800",
  },
];

export default function CategorySection() {
  return (
    <section className="categories section-padding">
      <div className="container">
        <h2 className="section-title">¿Qué estás buscando?</h2>
        <p className="section-subtitle">Encontrá exactamente lo que necesitás</p>

        <div className="categories__grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.href}
              className="category-card"
              style={{ "--card-bg": cat.color, "--card-accent": cat.accent }}
            >
              <div className="category-card__icon">{cat.emoji}</div>
              <div className="category-card__info">
                <span className="category-card__label">{cat.label}</span>
                <span className="category-card__sub">{cat.subtitle}</span>
              </div>
              <span className="category-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
