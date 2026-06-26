// ============================================
<<<<<<< HEAD
// APP.JSX — Configuración de rutas (Sprint 2)
// Para agregar una página nueva:
// 1. Creá el componente en /src/pages/
// 2. Importalo acá abajo
// 3. Agregá un <Route> dentro de <Routes>
// ============================================

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/variables.css";

import Navbar   from "./components/Navbar/Navbar";
import Footer   from "./components/Footer/Footer";
import Chatbot  from "./components/Chatbot/Chatbot";
import ComplaintButton from "./components/ComplaintButton/ComplaintButton";

import HomePage          from "./pages/HomePage";
import CategoryPage       from "./pages/CategoryPage";
import SearchResultsPage  from "./pages/SearchResultsPage";
import NotFoundPage       from "./pages/NotFoundPage";

=======
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

>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
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
<<<<<<< HEAD
    <BrowserRouter>
      {/* Banner superior */}
      <AnnouncementBar />

      {/* Navbar fijo (presente en todas las páginas) */}
      <Navbar />

      {/* Contenido según la ruta */}
      <main>
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Búsqueda: /buscar?q=texto */}
            <Route path="/buscar" element={<SearchResultsPage />} />
            {/* ✅ Rutas que deben ir al 404 explícitamente, ANTES de /:category */}
            <Route path="/recuperar-password" element={<NotFoundPage />} />
            <Route path="/registro" element={<NotFoundPage />} />
            <Route path="/login" element={<NotFoundPage />} />
            {/* Categorías: /bebes, /ninas, /ninos, con o sin subcategoría */}
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/:category/:subcategory" element={<CategoryPage />} />
            {/* Cualquier otra ruta no definida → 404 */}
            <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
=======
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
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d

      {/* Footer */}
      <Footer />

      {/* Chatbot flotante */}
      <Chatbot />

<<<<<<< HEAD
      {/* Botón de quejas y reclamos */}
      <ComplaintButton />
    </BrowserRouter>
  );
}
=======
      {/* Botón de quejas y reclamos (componente de mi compañero) */}
      <ComplaintButton />
    </>
  );
}
>>>>>>> 88150f3cc7f490d043c4e6f4efee1f1e0babb79d
