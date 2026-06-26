// ============================================
// CART PAGE — Página del carrito de compras
// Ruta: /carrito
// ============================================

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, totalPrice } = useCart();

  // ── Carrito vacío ──
  if (items.length === 0) {
    return (
      <main className="cart-page section-padding">
        <div className="container cart-page__empty">
          <span className="cart-page__empty-icon">🛍</span>
          <h1 className="cart-page__empty-title">Tu carrito está vacío</h1>
          <p className="cart-page__empty-text">
            Explorá nuestras categorías y agregá lo que más te guste.
          </p>
          <Link to="/" className="cart-page__empty-btn">
            Seguir comprando
          </Link>
        </div>
      </main>
    );
  }

  const envio = totalPrice >= 15000 ? 0 : 2500;
  const total = totalPrice + envio;

  return (
    <main className="cart-page section-padding">
      <div className="container">

        {/* Encabezado */}
        <div className="cart-page__header">
          <h1 className="section-title">Mi carrito</h1>
          <button className="cart-page__clear" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>

        <div className="cart-page__layout">

          {/* ── Lista de productos ── */}
          <div className="cart-page__items">
            {items.map((item) => (
              <div key={item._key} className="cart-item">

                {/* Imagen / emoji */}
                <div className="cart-item__img">
                  <span>{item.emoji}</span>
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <p className="cart-item__name">{item.name}</p>
                  <p className="cart-item__size">Talle: <strong>{item.size}</strong></p>
                  <p className="cart-item__price">{formatPrice(item.price)}</p>
                </div>

                {/* Cantidad */}
                <div className="cart-item__qty">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQty(item._key, item.quantity - 1)}
                    aria-label="Restar"
                  >
                    −
                  </button>
                  <span className="cart-item__qty-num">{item.quantity}</span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQty(item._key, item.quantity + 1)}
                    aria-label="Sumar"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="cart-item__subtotal">
                  {formatPrice(item.price * item.quantity)}
                </p>

                {/* Eliminar */}
                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(item._key)}
                  aria-label="Eliminar producto"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ── Resumen de compra ── */}
          <aside className="cart-summary">
            <h2 className="cart-summary__title">Resumen</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="cart-summary__row">
              <span>Envío</span>
              <span className={envio === 0 ? "cart-summary__free" : ""}>
                {envio === 0 ? "¡Gratis! 🎉" : formatPrice(envio)}
              </span>
            </div>

            {envio > 0 && (
              <p className="cart-summary__shipping-hint">
                Sumá ${(15000 - totalPrice).toLocaleString("es-AR")} más para envío gratis
              </p>
            )}

            <div className="cart-summary__divider" />

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button className="cart-summary__btn-checkout">
              Iniciar compra →
            </button>

            <Link to="/catalogo" className="cart-summary__btn-continue">
              ← Seguir comprando
            </Link>

            <div className="cart-summary__badges">
              <span>🔒 Pago 100% seguro</span>
              <span>📦 Envíos a todo el país</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
