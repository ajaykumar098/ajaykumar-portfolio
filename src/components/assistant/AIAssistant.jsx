import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBot, LuX, LuSend } from "react-icons/lu";
import { chatWithAssistant, isSummarizeRequest } from "../../services/anthropic";
import { useSpeech } from "../../hooks/useSpeech";
import { useScroll } from "../../context/ScrollContext";
import { parseNavigationCommand } from "../../utils/helpers";
import Waveform from "./Waveform";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Ajay's portfolio assistant. Ask me about his skills, projects, or say 'summarize this portfolio'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { speak, stopSpeaking, isSpeaking } = useSpeech();
  const { scrollToSection } = useScroll();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNavigation = (text) => {
    const section = parseNavigationCommand(text);
    if (section) {
      scrollToSection(section);
      return `Navigating to the ${section} section.`;
    }
    return null;
  };

  const processMessage = async (text) => {
    if (!text.trim()) return;

    const navResponse = handleNavigation(text);
    const userMsg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (navResponse) {
        const reply = { role: "assistant", content: navResponse };
        setMessages((prev) => [...prev, reply]);
        speak(navResponse);
        return;
      }

      const history = [...messages.filter((m) => m.role !== "system"), userMsg];
      if (isSummarizeRequest(text)) {
        history[history.length - 1] = {
          role: "user",
          content:
            "Please summarize this portfolio in a concise, spoken-friendly way covering education, skills, projects, and achievements.",
        };
      }

      const response = await chatWithAssistant(history);
      const reply = { role: "assistant", content: response };
      setMessages((prev) => [...prev, reply]);
      speak(response);
    } catch (err) {
      const errMsg = {
        role: "assistant",
        content: "Sorry, I ran into an error reaching the assistant. Please try again or use the contact section.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processMessage(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-violet text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <LuX size={24} /> : <LuBot size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-2xl panel-stroke bg-paper dark:bg-paper-dark shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="px-4 py-3 border-b panel-stroke border-x-0 border-t-0 flex items-center justify-between bg-accent/5">
              <div>
                <h3 className="font-display text-lg font-semibold">Portfolio Assistant</h3>
                <p className="text-xs opacity-60">Chat enabled</p>
              </div>
              {isSpeaking && (
                <div className="flex items-center gap-2">
                  <Waveform active />
                  <button type="button" onClick={stopSpeaking} className="text-xs text-accent dark:text-accent-light" aria-label="Stop speaking">
                    Stop
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[40vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-accent to-violet text-white"
                        : "panel-stroke bg-fold/20 dark:bg-fold-dark/20"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-sm opacity-60 animate-pulse">Thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t panel-stroke border-x-0 border-b-0 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Ajay's portfolio..."
                className="flex-1 px-3 py-2 rounded-lg panel-stroke bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-violet text-white text-sm font-medium disabled:opacity-50 flex items-center gap-1.5"
              >
                <LuSend size={14} />
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
