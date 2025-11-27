import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Trash2, MessageSquare } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const tempUserMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: userMessage,
    };

    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, language }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (!confirm(language === 'tr' ? 'Sohbet geçmişini silmek istediğinizden emin misiniz?' : 'Are you sure you want to clear chat history?')) return;
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-amber-200/50 px-4 py-3 md:py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden bg-white">
            <img 
              src="https://mocha-cdn.com/019ac633-ec7b-725f-94bf-551cb5453205/pikachu-logo.png" 
              alt="Pikachu"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              Pika-AI
              <MessageSquare className="w-4 h-4 text-orange-700" />
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-1 flex gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                language === 'en' 
                  ? 'bg-white text-amber-900 shadow-md' 
                  : 'text-amber-900/70 hover:text-amber-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                language === 'tr' 
                  ? 'bg-white text-amber-900 shadow-md' 
                  : 'text-amber-900/70 hover:text-amber-900'
              }`}
            >
              TR
            </button>
          </div>

          <button
            onClick={clearHistory}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all text-amber-900"
            title={language === 'tr' ? 'Geçmişi Temizle' : 'Clear History'}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl bg-white">
                <img 
                  src="https://mocha-cdn.com/019ac633-ec7b-725f-94bf-551cb5453205/pikachu-logo.png" 
                  alt="Pikachu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">
              {language === 'tr' ? 'Merhaba! 👋' : 'Hello! 👋'}
            </h2>
            <p className="text-base md:text-lg text-amber-800 max-w-md mb-4">
              {language === 'tr' 
                ? "Size nasıl yardımcı olabilirim? Sorularınızı sormaktan çekinmeyin."
                : "How can I help you today? Feel free to ask me anything."}
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-br from-amber-700 to-orange-800 text-white"
                  : "bg-white/80 backdrop-blur-md text-amber-900 border border-amber-300/50"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-amber-300/50">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                <span className="text-amber-900">{language === 'tr' ? 'Düşünüyor...' : 'Thinking...'}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-white/40 backdrop-blur-md border-t border-amber-300/50">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'tr' ? "Mesajını yaz..." : "Type your message..."}
            className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-900 placeholder-amber-700/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-br from-amber-700 to-orange-800 text-white rounded-full hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
