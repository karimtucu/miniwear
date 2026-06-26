import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

// ============================================
// CHATBOT — Solo botones por ahora
// Para habilitar el input libre: cambiar INPUT_HABILITADO a true
// ============================================

const INPUT_HABILITADO = false; // ← cambiá a true en el Sprint 3

const QUICK_REPLIES = [
  {
    label: "¿Cuánto tarda el envío?",
    answer: "Los envíos salen en 24-48hs hábiles desde que confirmás el pago 🚚 Recibís un mail con el número de seguimiento.",
  },
  {
    label: "¿Cómo son los talles?",
    answer: "Nuestros talles van por edad y medidas 📏 Si el nene está entre dos talles, recomendamos el más grande. ",
  },
  {
    label: "¿Hacen cambios?",
    answer: "Sí, tenés 30 días para cambios y devoluciones 📦 Tiene que estar sin uso y con etiqueta. ",
  },
  {
    label: "¿Cuáles son los medios de pago?",
    answer: "Aceptamos tarjetas de crédito y débito, transferencia bancaria y Mercado Pago 💳 Todas las compras son 100% seguras.",
  },
];

export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "¡Hola! 👋 Soy el asistente de MiniWear. Tocá una de las opciones para consultarme:", time: new Date() },
  ]);
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const handleQuickReply = ({ label, answer }) => {
    // Mensaje del usuario
    const userMsg = { id: Date.now(), from: "user", text: label, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    // Respuesta del bot con delay
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, from: "bot", text: answer, time: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Botón flotante */}
      <button
        className={`chatbot__fab ${open ? "chatbot__fab--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat de ayuda"
      >
        {open ? "✕" : "💬"}
        {!open && unread > 0 && (
          <span className="chatbot__fab-badge">{unread}</span>
        )}
      </button>

      {/* Panel del chat */}
      {open && (
        <div className="chatbot__panel">
          {/* Header */}
          <div className="chatbot__header">
            <div className="chatbot__header-avatar">👕</div>
            <div className="chatbot__header-info">
              <span className="chatbot__header-name">Asistente MiniWear</span>
              <span className="chatbot__header-status">● En línea</span>
            </div>
            <button className="chatbot__close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Mensajes */}
          <div className="chatbot__messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot__msg chatbot__msg--${msg.from}`}>
                <p className="chatbot__msg-text">{msg.text}</p>
                <span className="chatbot__msg-time">{formatTime(msg.time)}</span>
              </div>
            ))}

            {typing && (
              <div className="chatbot__msg chatbot__msg--bot chatbot__typing">
                <span /><span /><span />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Botones de preguntas */}
          <div className="chatbot__quick">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.label}
                className="chatbot__quick-btn"
                onClick={() => handleQuickReply(q)}
                disabled={typing}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input deshabilitado — se activa cuando INPUT_HABILITADO = true */}
          {INPUT_HABILITADO && (
            <div className="chatbot__input-row">
              <textarea
                className="chatbot__input"
                placeholder="Escribí tu consulta..."
                rows={1}
              />
              <button className="chatbot__send" aria-label="Enviar">➤</button>
            </div>
          )}

          {!INPUT_HABILITADO && (
            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-muted)", padding: "8px" }}>
              Usá los botones para consultarnos 👆
            </p>
          )}
        </div>
      )}
    </>
  );
}