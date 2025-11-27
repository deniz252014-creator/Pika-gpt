import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Loader2, Bot, MessageSquare, Sparkles, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  const { user, isPending, redirectToLogin } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="animate-spin">
          <Loader2 className="w-12 h-12 text-amber-900" />
        </div>
      </div>
    );
  }

  const translations = {
    en: {
      title: "Pikachu AI",
      subtitle: "Your intelligent AI companion",
      description: "Experience the next generation of AI assistance with advanced language understanding and personalized responses",
      login: "Sign in with Google",
      features: [
        { icon: Zap, title: "Lightning Fast", desc: "Get instant answers to your questions" },
        { icon: Shield, title: "Secure & Private", desc: "Your conversations are protected" },
        { icon: Globe, title: "Multilingual", desc: "Chat in English or Turkish" }
      ],
      poweredBy: "Powered by OpenAI"
    },
    tr: {
      title: "Pikachu AI",
      subtitle: "Akıllı yapay zeka asistanınız",
      description: "Gelişmiş dil anlayışı ve kişiselleştirilmiş yanıtlarla yeni nesil yapay zeka deneyimi",
      login: "Google ile Giriş Yap",
      features: [
        { icon: Zap, title: "Hızlı Yanıt", desc: "Sorularınıza anında cevap alın" },
        { icon: Shield, title: "Güvenli ve Özel", desc: "Konuşmalarınız korunur" },
        { icon: Globe, title: "Çok Dilli", desc: "İngilizce veya Türkçe konuşun" }
      ],
      poweredBy: "OpenAI ile destekleniyor"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-300 to-orange-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/60 backdrop-blur-xl rounded-full p-1.5 flex gap-1 shadow-xl border border-amber-200/50">
          <button
            onClick={() => setLanguage('en')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              language === 'en' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105' 
                : 'text-amber-800/70 hover:text-amber-900 hover:bg-white/30'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('tr')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              language === 'tr' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105' 
                : 'text-amber-800/70 hover:text-amber-900 hover:bg-white/30'
            }`}
          >
            TR
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Icon with glow effect */}
          <div className="mb-10 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Bot className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 rounded-full"></div>
            </div>
            <Sparkles className="absolute -top-3 -right-3 w-10 h-10 text-orange-600 animate-bounce drop-shadow-lg" />
          </div>

          {/* Title with gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
            {t.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-amber-800/90 mb-4 font-bold tracking-tight">
            {t.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-amber-700/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-amber-200/50 hover:bg-white/70 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-amber-700/80">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Login button with enhanced styling */}
          <div className="mb-8">
            <button
              onClick={redirectToLogin}
              className="group relative px-10 py-5 md:px-12 md:py-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-full font-bold text-lg md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl"></div>
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-pulse" />
                {t.login}
                <Sparkles className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </span>
            </button>
          </div>

          {/* Powered by badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-amber-200/50">
            <MessageSquare className="w-5 h-5 text-amber-700" />
            <span className="text-sm font-semibold text-amber-900">{t.poweredBy}</span>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
