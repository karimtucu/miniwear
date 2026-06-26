import { useState } from "react";
import "./ComplaintButton.css";
import ComplaintModal from "../ComplaintModal/ComplaintModal";

// ============================================
// BOTÓN DE QUEJAS Y RECLAMOS
// Ahora abre el ComplaintModal en lugar de navegar a otra página.
// ============================================

export default function ComplaintButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="complaint-btn" onClick={() => setIsOpen(true)}>
        💬 Ayuda y Reclamos
      </button>

      <ComplaintModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
