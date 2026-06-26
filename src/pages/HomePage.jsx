// ============================================
// PÁGINA DE INICIO
// Contenido que antes estaba directo en App.jsx
// ============================================

import Hero            from "../components/Hero/Hero";
import CategorySection from "../components/CategorySection/CategorySection";
import ProductGrid     from "../components/ProductGrid/ProductGrid";
import Newsletter      from "../components/Newsletter/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductGrid title="Productos destacados" maxItems={8} />
      <Newsletter />
    </>
  );
}
