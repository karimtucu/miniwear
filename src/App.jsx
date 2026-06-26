// ============================================
// APP.JSX — Configuración de rutas
// ============================================

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/variables.css";

import { CartProvider } from "./context/CartContext";

import Navbar          from "./components/Navbar/Navbar";
import Footer          from "./components/Footer/Footer";
import Chatbot         from "./components/Chatbot/Chatbot";
import ComplaintButton from "./components/ComplaintButton/ComplaintButton";

import HomePage          from "./pages/HomePage";
import CategoryPage      from "./pages/CategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CatalogPage       from "./pages/CatalogPage";
import CartPage          from "./pages/CartPage";
import NotFoundPage      from "./pages/NotFoundPage";

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
    // CartProvider envuelve TODO para que cualquier componente pueda usar useCart()
    <CartProvider>
      <BrowserRouter>
        <AnnouncementBar />
        <Navbar />

        <main>
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/carrito"  element={<CartPage />} />
            <Route path="/buscar"   element={<SearchResultsPage />} />

            {/* Rutas sin página real → 404 hasta el Sprint 3 */}
            <Route path="/recuperar-password" element={<NotFoundPage />} />
            <Route path="/registro"           element={<NotFoundPage />} />
            <Route path="/login"              element={<NotFoundPage />} />

            {/* Categorías: /bebes, /ninas, /ninos, con o sin subcategoría */}
            <Route path="/:category"              element={<CategoryPage />} />
            <Route path="/:category/:subcategory" element={<CategoryPage />} />

            {/* Cualquier ruta no definida → 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot />
        <ComplaintButton />
      </BrowserRouter>
    </CartProvider>
  );
}
