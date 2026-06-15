# MiniWear — Frontend React 

## Cómo correr el proyecto

```bash
cd kidswear
npm install
npm run dev
```

Abre http://localhost:5173

---

## Estructura de archivos

```
kidswear/
├── index.html                  ← HTML base (cambiar título/favicon acá)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                ← Entry point (no tocar)
    ├── App.jsx                 ← ENSAMBLA TODO — agregar secciones acá
    │
    ├── styles/
    │   └── variables.css       ← 🎨 PALETA Y TOKENS — modificar colores acá
    │
    └── components/
        ├── Navbar/
        │   ├── Navbar.jsx      ← NAV_LINKS: agregar/quitar secciones del menú
        │   └── Navbar.css
        │
        ├── Hero/
        │   ├── Hero.jsx        ← SLIDES: contenido del slider (textos, colores, imágenes)
        │   └── Hero.css
        │
        ├── CategorySection/
        │   ├── CategorySection.jsx   ← CATEGORIES: secciones con íconos y colores
        │   └── CategorySection.css
        │
        ├── ProductGrid/
        │   ├── ProductGrid.jsx       ← MOCK_PRODUCTS: reemplazar con API del backend
        │   └── ProductGrid.css
        │
        ├── Newsletter/
        │   ├── Newsletter.jsx        ← Formulario con validación (email/WhatsApp)
        │   └── Newsletter.css
        │
        ├── Chatbot/
        │   ├── Chatbot.jsx           ← AUTO_REPLIES: respuestas automáticas del bot
        │   └── Chatbot.css
        │
        └── Footer/
            ├── Footer.jsx            ← FOOTER_LINKS: links del pie de página
            └── Footer.css
```

---

## Cómo modificar cosas frecuentes

### Cambiar colores
Editá `/src/styles/variables.css` — todo el sistema de colores está acá como variables CSS. Cambiando `--color-rosa-dark` se actualiza en toda la app.

### Agregar una sección al menú
En `Navbar.jsx`, agregá un objeto al array `NAV_LINKS`:
```js
{ label: "Nueva Sección", href: "/nueva", submenu: ["Sub1", "Sub2"] }
```

### Cambiar el slider/hero
En `Hero.jsx`, editá el array `SLIDES`. Para usar imágenes reales:
1. Poné el archivo en `/public/assets/`
2. Cambiá `emoji` por `image: "/assets/mi-foto.jpg"` en el objeto
3. Descomentá `<img>` y comentá `<div className="hero__placeholder">`

### Conectar productos con el backend
En `ProductGrid.jsx`, reemplazá `MOCK_PRODUCTS` con un fetch al backend:
```js
useEffect(() => {
  fetch('/api/products').then(r => r.json()).then(setProducts);
}, []);
```

### Cambiar respuestas del chatbot
En `Chatbot.jsx`, editá `AUTO_REPLIES` con las respuestas que quieran.

---
