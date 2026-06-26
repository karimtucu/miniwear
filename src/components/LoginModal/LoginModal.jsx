import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginModal.css";

// ============================================
// LOGIN MODAL
// Convertido del HTML/JS de mi compañero a React.
// El botón que abre este modal se usa en el Navbar (ver Navbar.jsx → <LoginModal />)
// ============================================

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  if (!isOpen) return null;

  // Cierra el modal si se hace click afuera del contenedor (igual que window.onclick del original)
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("login-modal")) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Completá email y contraseña.");
      return;
    }
    setError("");
    // TODO: conectar con el backend de tu compañero (endpoint de login)
    console.log("Login intentado con:", { email, password });
  };

  return (
    <div className="login-modal" onClick={handleBackdropClick}>
      <div className="login-container">

        <button className="close-login" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        {/* Lado izquierdo: branding */}
        <div className="login-left">
          <div className="brand">👕</div>
          <h2>MiniWear</h2>
          <p>Moda infantil cómoda, moderna y divertida.</p>
        </div>

        {/* Lado derecho: formulario */}
        <div className="login-right">
          <h2>Bienvenida 👋</h2>
          <p className="subtitle">Inicia sesión para continuar</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="login-error">⚠ {error}</p>}

            <button type="submit" className="btn-login">
              Iniciar Sesión
            </button>
          </form>

          <div className="login-links">
            <Link to="/recuperar-password" onClick={onClose}>¿Olvidaste tu contraseña?</Link>
            <Link to="/registro" onClick={onClose}>Crear cuenta</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
