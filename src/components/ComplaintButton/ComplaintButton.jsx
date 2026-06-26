import "./ComplaintButton.css";

// ============================================
// BOTÓN DE QUEJAS Y RECLAMOS
// Convertido del HTML/CSS de mi compañero a React.
// Botón flotante fijo abajo a la derecha.
// ============================================

export default function ComplaintButton({ href = "/reclamos" }) {
  return (
    <a href={href} className="complaint-btn">
      💬 Ayuda y Reclamos
    </a>
  );
}
