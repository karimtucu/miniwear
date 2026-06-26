import { useState } from "react";
import "./ComplaintModal.css";

// ============================================
// MODAL DE AYUDA Y RECLAMOS
// Mismo estilo visual que LoginModal, pero con formulario
// de contacto: email, asunto y mensaje (máx 100 caracteres).
// ============================================

const MAX_MESSAGE_LENGTH = 100;

export default function ComplaintModal({ isOpen, onClose }) {
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  if (!isOpen) return null;

  // Cierra el modal si se hace click afuera del contenedor (igual que LoginModal)
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("complaint-modal")) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Reseteamos el formulario después de cerrar, con un pequeño delay
    // para que no se vea el flash de campos vacíos antes de la animación de salida
    setTimeout(() => {
      setEmail("");
      setSubject("");
      setMessage("");
      setError("");
      setSent(false);
    }, 200);
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) { setError("Ingresá tu email de contacto."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("El email no es válido."); return; }
    if (!subject.trim()) { setError("Ingresá el asunto de tu reclamo."); return; }
    if (!message.trim()) { setError("Contanos tu consulta o reclamo."); return; }

    setError("");

    // TODO: conectar con el backend de mi compañero (endpoint de reclamos)
    console.log("Reclamo enviado:", { email, subject, message });

    setSent(true);
  };

  return (
    <div className="complaint-modal" onClick={handleBackdropClick}>
      <div className="complaint-container">

        <button className="close-complaint" onClick={handleClose} aria-label="Cerrar">
          ×
        </button>

        {/* Lado izquierdo: branding (igual que LoginModal) */}
        <div className="complaint-left">
          <div className="complaint-brand">💬</div>
          <h2>Ayuda y Reclamos</h2>
          <p>Contanos qué pasó. Te respondemos a la brevedad.</p>
        </div>

        {/* Lado derecho: formulario o confirmación */}
        <div className="complaint-right">
          {!sent ? (
            <>
              <h2>Estamos para ayudarte 👂</h2>
              <p className="complaint-subtitle">Completá el formulario y te contactamos</p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Tu email de contacto"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                />

                <input
                  type="text"
                  placeholder="Asunto (ej: Producto con falla)"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); setError(""); }}
                />

                <div className="complaint-textarea-wrap">
                  <textarea
                    placeholder="Contanos tu reclamo o consulta..."
                    value={message}
                    onChange={handleMessageChange}
                    rows={4}
                  />
                  <span className={`complaint-char-count ${message.length >= MAX_MESSAGE_LENGTH ? "complaint-char-count--limit" : ""}`}>
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>

                {error && <p className="complaint-error">⚠ {error}</p>}

                <button type="submit" className="btn-complaint">
                  Enviar reclamo
                </button>
              </form>
            </>
          ) : (
            <div className="complaint-success">
              <span className="complaint-success-icon">✅</span>
              <h2>¡Recibimos tu mensaje!</h2>
              <p className="complaint-subtitle">
                Te vamos a responder a <strong>{email}</strong> a la brevedad.
              </p>
              <button className="btn-complaint" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
