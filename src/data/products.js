// ============================================
// DATOS DE PRODUCTOS — fuente única
// Reemplazar por fetch al backend cuando esté listo.
// category: "bebes" | "ninas" | "ninos"
// subcategory: usado para filtrar por sub-secciones del navbar
// ============================================

export const PRODUCTS = [
  { id: 1, name: "Campera Puffer Rosa",     category: "ninas",  subcategory: "camperas",   price: 18500, originalPrice: 26000, discount: 30, size: ["2", "4", "6", "8"],     isNew: false, image: null, emoji: "🧥" },
  { id: 2, name: "Buzo Astronauta",         category: "ninos",  subcategory: "buzos",      price: 12000, originalPrice: null,   discount: 0,  size: ["4", "6", "8", "10"],    isNew: true,  image: null, emoji: "👕" },
  { id: 3, name: "Pelele Invierno",         category: "bebes",  subcategory: "6-12-meses", price: 9800,  originalPrice: 14000,  discount: 30, size: ["0-3m", "3-6m", "6-12m"],isNew: false, image: null, emoji: "🍼" },
  { id: 4, name: "Conjunto Deportivo Nena", category: "ninas",  subcategory: "remeras",    price: 15200, originalPrice: null,   discount: 0,  size: ["4", "6", "8", "10"],    isNew: true,  image: null, emoji: "🩳" },
  { id: 5, name: "Remera Gol",              category: "ninos",  subcategory: "remeras",    price: 6900,  originalPrice: 9900,   discount: 30, size: ["4", "6", "8", "10", "12"], isNew: false, image: null, emoji: "⚽" },
  { id: 6, name: "Body Algodón Pack x3",    category: "bebes",  subcategory: "0-3-meses",  price: 11500, originalPrice: null,   discount: 0,  size: ["0-3m", "3-6m"],         isNew: true,  image: null, emoji: "👶" },
  { id: 7, name: "Campera Impermeable",     category: "ninos",  subcategory: "camperas",   price: 22000, originalPrice: 31000,  discount: 30, size: ["6", "8", "10", "12"],    isNew: false, image: null, emoji: "🧥" },
  { id: 8, name: "Vestido Flores",          category: "ninas",  subcategory: "vestidos",   price: 13500, originalPrice: null,   discount: 0,  size: ["2", "4", "6", "8"],     isNew: true,  image: null, emoji: "👗" },
  { id: 9, name: "Pantalón Jogger",         category: "ninos",  subcategory: "pantalones", price: 10200, originalPrice: null,   discount: 0,  size: ["4", "6", "8", "10"],    isNew: false, image: null, emoji: "👖" },
  { id: 10, name: "Pantalón Niña Chupin",   category: "ninas",  subcategory: "pantalones", price: 9800,  originalPrice: null,   discount: 0,  size: ["2", "4", "6", "8"],     isNew: false, image: null, emoji: "👖" },
  { id: 11, name: "Mameluco 3-6 meses",     category: "bebes",  subcategory: "3-6-meses",  price: 8900,  originalPrice: null,   discount: 0,  size: ["3-6m"],                 isNew: false, image: null, emoji: "👶" },
  { id: 12, name: "Conjunto 1-2 años",      category: "bebes",  subcategory: "1-2-anos",   price: 13200, originalPrice: 17500,  discount: 25, size: ["1a", "2a"],            isNew: false, image: null, emoji: "🍼" },
];

// Subcategorías visibles en el navbar — deben coincidir con las usadas arriba
export const SUBCATEGORIES = {
  bebes: [
    { label: "0-3 meses",  slug: "0-3-meses" },
    { label: "3-6 meses",  slug: "3-6-meses" },
    { label: "6-12 meses", slug: "6-12-meses" },
    { label: "1-2 años",   slug: "1-2-anos" },
  ],
  ninas: [
    { label: "Remeras",    slug: "remeras" },
    { label: "Vestidos",   slug: "vestidos" },
    { label: "Camperas",   slug: "camperas" },
    { label: "Pantalones", slug: "pantalones" },
  ],
  ninos: [
    { label: "Remeras",    slug: "remeras" },
    { label: "Buzos",      slug: "buzos" },
    { label: "Camperas",   slug: "camperas" },
    { label: "Pantalones", slug: "pantalones" },
  ],
};

export const CATEGORY_LABELS = {
  bebes: "Bebés",
  ninas: "Niñas",
  ninos: "Niños",
};

// Búsqueda simple por nombre (case-insensitive)
export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
}

// Filtro por categoría y, opcionalmente, subcategoría
export function getProductsByCategory(category, subcategory = null) {
  return PRODUCTS.filter((p) => {
    if (p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    return true;
  });
}
