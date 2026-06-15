import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

// ============================================
// CHATBOT — Centro de atención personalizada
// ============================================

// Respuestas automáticas mock — conectar con backend real
const AUTO_REPLIES = {
  "talle":    "Para saber tu talle, medí el pecho y la cintura del nene y fijate en nuestra guía de talles 📏 ¿Querés que te la mande?",
  "envio":    "Los envíos salen en 24-48hs hábiles 🚚 Podés seguir tu pedido desde 'Mi cuenta'.",
  "cambio":   "Los cambios y devoluciones se hacen en los primeros 30 días 📦 ¿Compraste en tienda o online?",
  "precio":   "Nuestros precios son los que ves en la web, sin costos ocultos 💸 ¿Buscás algún producto en particular?",
  "default":  "¡Hola! Estamos acá para ayudarte 😊 Podés preguntarme sobre talles, envíos, cambios o precios.",
};

const getAutoReply = (text) => {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (key !== "default" && lower.includes(key)) return reply;
  }
  return AUTO_REPLIES.default;
};

export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "¡Hola! 👋 Soy tu asistente de MiniWear. ¿En qué te ayudo hoy?", time: new Date() },
  ]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const bottomRef               = useRef(null);

  // Scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Marcar leídos al abrir
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: "user", text, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simular respuesta bot (reemplazar con llamada real al backend)
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        from: "bot",
        text: getAutoReply(text),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread((n) => n + 1);
    }, 1000 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
              <div
                key={msg.id}
                className={`chatbot__msg chatbot__msg--${msg.from}`}
              >
                <p className="chatbot__msg-text">{msg.text}</p>
                <span className="chatbot__msg-time">{formatTime(msg.time)}</span>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chatbot__msg chatbot__msg--bot chatbot__typing">
                <span /><span /><span />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="chatbot__quick">
            {["Talles", "Envíos", "Cambios", "Precios"].map((q) => (
              <button
                key={q}
                className="chatbot__quick-btn"
                onClick={() => { setInput(q); }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot__input-row">
            <textarea
              className="chatbot__input"
              placeholder="Escribí tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="chatbot__send"
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Enviar"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
