import { useState } from "react";
import "./Newsletter.css";

// ============================================
// NEWSLETTER / NOTIFICACIONES
// Soluciona el problema de datos incorrectos con validación
// ============================================

const CHANNELS = [
  { id: "email",    label: "Email",    icon: "📧" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
];

const INTERESTS = [
  { id: "bebes",     label: "Bebés"    },
  { id: "ninas",     label: "Niñas"    },
  { id: "ninos",     label: "Niños"    },
  { id: "ofertas",   label: "Ofertas"  },
  { id: "novedades", label: "Novedades"},
];

export default function Newsletter() {
  const [step, setStep]               = useState(1); // 1: form, 2: verificar, 3: listo
  const [channel, setChannel]         = useState("email");
  const [contact, setContact]         = useState("");
  const [interests, setInterests]     = useState([]);
  const [error, setError]             = useState("");
  const [verifyCode, setVerifyCode]   = useState("");

  // Validación básica
  const validate = () => {
    if (!contact.trim()) { setError("Ingresá tu email o WhatsApp."); return false; }
    if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setError("El email no es válido. Ej: nombre@mail.com"); return false;
    }
    if (channel === "whatsapp" && !/^\+?\d{10,13}$/.test(contact.replace(/\s/g, ""))) {
      setError("Ingresá un número con código de país. Ej: +5491112345678"); return false;
    }
    if (interests.length === 0) { setError("Seleccioná al menos un interés."); return false; }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // TODO: llamar al backend para enviar código de verificación
    setStep(2);
  };

  const handleVerify = () => {
    if (verifyCode.length < 4) { setError("Ingresá el código completo."); return; }
    // TODO: validar código con backend
    setStep(3);
  };

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="newsletter section-padding">
      <div className="container">
        <div className="newsletter__card">

          {/* Paso 1: Formulario */}
          {step === 1 && (
            <>
              <div className="newsletter__text">
                <span className="newsletter__eyebrow">📬 Mantenete al día</span>
                <h2 className="newsletter__title">Ofertas y novedades directo a vos</h2>
                <p className="newsletter__desc">
                  Elegí cómo querés recibir nuestros avisos y seleccioná lo que te interesa.
                  Sin spam, solo lo que pedís.
                </p>
              </div>

              {/* Canal */}
              <div className="newsletter__channels">
                {CHANNELS.map((c) => (
                  <button
                    key={c.id}
                    className={`channel-btn ${channel === c.id ? "channel-btn--active" : ""}`}
                    onClick={() => { setChannel(c.id); setContact(""); setError(""); }}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>

              {/* Input contacto */}
              <div className="newsletter__field">
                <label className="newsletter__label">
                  {channel === "email" ? "Tu email" : "Tu WhatsApp (con código de país)"}
                </label>
                <input
                  type={channel === "email" ? "email" : "tel"}
                  placeholder={channel === "email" ? "ejemplo@mail.com" : "+54 9 11 1234 5678"}
                  className={`newsletter__input ${error ? "newsletter__input--error" : ""}`}
                  value={contact}
                  onChange={(e) => { setContact(e.target.value); setError(""); }}
                />
                {error && <p className="newsletter__error">⚠ {error}</p>}
              </div>

              {/* Intereses */}
              <div className="newsletter__interests">
                <label className="newsletter__label">Me interesa recibir info sobre:</label>
                <div className="newsletter__tags">
                  {INTERESTS.map((i) => (
                    <button
                      key={i.id}
                      className={`interest-tag ${interests.includes(i.id) ? "interest-tag--active" : ""}`}
                      onClick={() => toggleInterest(i.id)}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              <button className="newsletter__submit" onClick={handleSubmit}>
                Suscribirme →
              </button>
            </>
          )}

          {/* Paso 2: Verificación */}
          {step === 2 && (
            <div className="newsletter__verify">
              <span className="newsletter__verify-icon">📨</span>
              <h2 className="newsletter__title">Confirmá tu {channel === "email" ? "email" : "WhatsApp"}</h2>
              <p className="newsletter__desc">
                Te enviamos un código de 4 dígitos a <strong>{contact}</strong>.
                Ingresalo acá para confirmar.
              </p>
              <input
                type="text"
                placeholder="1234"
                maxLength={4}
                className="newsletter__input newsletter__input--code"
                value={verifyCode}
                onChange={(e) => { setVerifyCode(e.target.value.replace(/\D/g, "")); setError(""); }}
              />
              {error && <p className="newsletter__error">⚠ {error}</p>}
              <button className="newsletter__submit" onClick={handleVerify}>
                Confirmar
              </button>
              <button className="newsletter__back" onClick={() => setStep(1)}>
                ← Volver
              </button>
            </div>
          )}

          {/* Paso 3: Listo */}
          {step === 3 && (
            <div className="newsletter__success">
              <span className="newsletter__success-icon">🎉</span>
              <h2 className="newsletter__title">¡Estás dentro!</h2>
              <p className="newsletter__desc">
                Vas a recibir las mejores ofertas y novedades por {channel === "email" ? "email" : "WhatsApp"}.
                Podés darte de baja cuando quieras.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
