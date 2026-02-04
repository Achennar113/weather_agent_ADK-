import { useEffect, useRef, useState } from "react";
import { sendMessage } from "./api";

type Msg = {
  role: "user" | "agent";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    if (showWelcome) setShowWelcome(false);

    const userMsg: Msg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "agent", text: "Agent is thinking…" }]);
    }, 300);

    try {
      const data = await sendMessage(userMsg.text);

      setMessages(prev => {
        const msgs = [...prev];
        msgs.pop(); // remove thinking
        return [...msgs, { role: "agent", text: data.reply || "No response." }];
      });
    } catch {
      setMessages(prev => {
        const msgs = [...prev];
        msgs.pop();
        return [...msgs, {
          role: "agent",
          text: "⚠️ Failed to reach agent server."
        }];
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div ref={chatRef} className="chat">
        {showWelcome && (
          <div className="welcome-message">
            <span className="emoji">☁️</span>
            <h3>Welcome to Weather Agent</h3>
            <p>
              Ask me about the weather in any city, or just say hello!
              <br />
              I use AI and real-time data to give accurate forecasts.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div className={`bubble ${m.text.includes("thinking") ? "thinking" : ""}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask about weather in any city..."
          />
          <button className="send-btn" onClick={handleSend} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
