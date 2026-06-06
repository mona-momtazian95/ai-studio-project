import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Smile, Landmark, RefreshCw } from "lucide-react";
import { Language, ChatMessage } from "../types";

interface AIChatbotProps {
  lang: Language;
  t: (key: string) => string;
}

export default function AIChatbot({ lang, t }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message on first open
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t("chatWelcome"),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [lang]);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      // Build message payload from history for Gemini multi-turn conversation
      const payload = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: payload })
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "I am processing that. Could you repeat?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      // Give polite fallback message
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: t("chatErrorKey"),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: t("chatWelcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Sparkle Action Button */}
      <button
        id="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full p-4 shadow-xl hover:shadow-2xl z-40 transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer group"
        aria-label="Toggle AI Assistant Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spin-once" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-amber-500 rounded-full w-2.5 h-2.5 animate-ping" />
            <span className="absolute -top-2 -right-2 bg-amber-500 rounded-full w-2.5 h-2.5" />
          </div>
        )}
      </button>

      {/* Floating Chat Box Panel */}
      {isOpen && (
        <div
          id="chatbox-panel"
          className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl border border-stone-200 shadow-2xl z-40 flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header Layout */}
          <div className="bg-emerald-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-950 flex items-center justify-center font-serif text-white font-bold text-sm">
                  Y
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-emerald-800" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  {t("chatHeaderTitle")}
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                </h3>
                <span className="text-[11px] text-emerald-200 uppercase tracking-widest font-mono">Greek, En, Ru, Fa</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                title="Reset Chat"
                className="hover:bg-emerald-700/60 p-1.5 rounded-lg transition-colors text-emerald-100"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-700/60 p-1.5 rounded-lg transition-colors text-emerald-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50 select-text">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all text-left ${
                    m.role === "user"
                      ? "bg-emerald-800 text-white rounded-tr-none"
                      : "bg-white text-stone-800 rounded-tl-none border border-stone-200"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                </div>
                <span className="text-[9.5px] text-stone-400 font-mono mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Simulated typing status */}
            {loading && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Dental Suggestions Toolbar */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 flex flex-nowrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => handleSendMessage(t("suggestPricing"))}
                className="text-[11px] font-medium bg-white border border-stone-200 hover:border-emerald-700 text-stone-700 rounded-full px-3 py-1.5 shadow-sm transition-all inline-block cursor-pointer shrink-0"
              >
                {t("suggestPricing")}
              </button>
              <button
                onClick={() => handleSendMessage(t("suggestHours"))}
                className="text-[11px] font-medium bg-white border border-stone-200 hover:border-emerald-700 text-stone-700 rounded-full px-3 py-1.5 shadow-sm transition-all inline-block cursor-pointer shrink-0"
              >
                {t("suggestHours")}
              </button>
              <button
                onClick={() => handleSendMessage(t("suggestLocation"))}
                className="text-[11px] font-medium bg-white border border-stone-200 hover:border-emerald-700 text-stone-700 rounded-full px-3 py-1.5 shadow-sm transition-all inline-block cursor-pointer shrink-0"
              >
                {t("suggestLocation")}
              </button>
              <button
                onClick={() => handleSendMessage(t("suggestBooking"))}
                className="text-[11px] font-medium bg-white border border-stone-200 hover:border-emerald-700 text-stone-700 rounded-full px-3 py-1.5 shadow-sm transition-all inline-block cursor-pointer shrink-0"
              >
                {t("suggestBooking")}
              </button>
            </div>
          )}

          {/* Input Panel Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-stone-200 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("chatPlaceholder")}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-xl p-2.5 shadow transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
