// ============================================
// APP.JSX — Página principal (Sprint 1)
// Acá ensamblás todos los componentes.
// Para agregar secciones nuevas: importá el componente y poné <ComponenteNuevo /> abajo.
// ============================================

import "./styles/variables.css";

import Navbar          from "./components/Navbar/Navbar";
import Hero            from "./components/Hero/Hero";
import CategorySection from "./components/CategorySection/CategorySection";
import ProductGrid     from "./components/ProductGrid/ProductGrid";
import Newsletter      from "./components/Newsletter/Newsletter";
import Footer          from "./components/Footer/Footer";
import Chatbot         from "./components/Chatbot/Chatbot";
import ComplaintButton from "./components/ComplaintButton/ComplaintButton";

// Banner de anuncio (opcional — podés comentarlo si no lo necesitás)
function AnnouncementBar() {
  return (
    <div style={{
      background: "var(--color-text)",
      color: "var(--color-rosa-light)",
      textAlign: "center",
      padding: "var(--space-2) var(--space-4)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--font-semibold)",
      letterSpacing: "0.03em",
    }}>
      🚚 Envío gratis en compras desde $15.000 · 🔒 Compra 100% segura
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* Banner superior */}
      <AnnouncementBar />

      {/* Navbar fijo */}
      <Navbar />

      {/* Contenido principal */}
      <main>
        {/* 1. Hero / Slider */}
        <Hero />

        {/* 2. Categorías */}
        <CategorySection />

        {/* 3. Productos destacados */}
        <ProductGrid title="Productos destacados" maxItems={8} />

        {/* 4. Newsletter / Notificaciones */}
        <Newsletter />

        {/*
          SPRINT 2 → agregar acá:
          <BannerPromo />
          <TestimonialsSection />
          <FeaturedBrands />
        */}
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot flotante */}
      <Chatbot />

      {/* Botón de quejas y reclamos (componente de mi compañero) */}
      <ComplaintButton />
    </>
  );
}