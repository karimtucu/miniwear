import { useState, useEffect } from "react";
import "./Hero.css";

// ============================================
// SLIDES — reemplazá las imágenes y textos acá
// ============================================
const SLIDES = [
  {
    id: 1,
    badge:       "Nueva colección",
    title:       "Invierno con onda 🧣",
    subtitle:    "Camperas, buzos y más para el frío. Talles del 0 al 14.",
    cta:         "Ver colección",
    ctaHref:     "/invierno",
    ctaSecondary: "Ver ofertas",
    ctaSecondaryHref: "/liquidacion",
    bgColor:     "var(--color-lavanda-light)",
    accentColor: "var(--color-rosa-dark)",
    // image: "/assets/hero-slide-1.jpg",  ← descomentá cuando tengas imagen
    emoji:       "🧥",  // placeholder visual hasta tener imagen
  },
  {
    id: 2,
    badge:       "Liquidación",
    title:       "Hasta 40% OFF en seleccionados 🎉",
    subtitle:    "Stock limitado. Aprovechá antes de que se agote.",
    cta:         "Ir a liquidación",
    ctaHref:     "/liquidacion",
    ctaSecondary: "Ver todo",
    ctaSecondaryHref: "/catalogo",
    bgColor:     "var(--color-rosa-light)",
    accentColor: "var(--color-lavanda)",
    emoji:       "🛍",
  },
  {
    id: 3,
    badge:       "Novedades",
    title:       "Primavera ya está acá 🌸",
    subtitle:    "Conjuntos livianos y coloridos para los más chicos.",
    cta:         "Descubrir",
    ctaHref:     "/novedades",
    ctaSecondary: "Bebés",
    ctaSecondaryHref: "/bebes",
    bgColor:     "var(--color-amarillo)",
    accentColor: "var(--color-menta-dark)",
    emoji:       "🌼",
  },
];

// Cuántos ms dura cada slide (auto-play)
const AUTOPLAY_DELAY = 4500;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section className="hero" style={{ background: slide.bgColor }}>
      <div className="hero__container container">

        {/* Contenido */}
        <div className="hero__content" key={slide.id}>
          <span className="badge badge--new hero__badge">{slide.badge}</span>

          <h1 className="hero__title">{slide.title}</h1>
          <p  className="hero__subtitle">{slide.subtitle}</p>

          <div className="hero__actions">
            <a
              href={slide.ctaHref}
              className="hero__btn hero__btn--primary"
              style={{ background: slide.accentColor }}
            >
              {slide.cta}
            </a>
            <a href={slide.ctaSecondaryHref} className="hero__btn hero__btn--secondary">
              {slide.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Imagen / placeholder */}
        <div className="hero__visual">
          {/* 
            Reemplazá el emoji por tu imagen:
            <img src={slide.image} alt={slide.title} className="hero__img" />
          */}
          <div className="hero__placeholder">
            <span className="hero__placeholder-emoji">{slide.emoji}</span>
            <p className="hero__placeholder-text">Imagen del slide</p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button className="hero__arrow hero__arrow--prev" onClick={prev} aria-label="Anterior">
        ‹
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={next} aria-label="Siguiente">
        ›
      </button>

      {/* Dots */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
