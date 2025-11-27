import { useState } from "react";
import { useNavigate } from "react-router";
import { Loader2, Bot, Smartphone, Monitor, Gift } from "lucide-react";

export default function Setup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [devicePreference, setDevicePreference] = useState<"mobile" | "desktop" | "">("");
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !devicePreference) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          devicePreference,
          promoCode: promoCode.trim(),
        }),
      });

      if (response.ok) {
        navigate("/chat");
      } else {
        alert(language === 'tr' ? 'Bir hata oluştu' : 'An error occurred');
      }
    } catch (error) {
      console.error("Setup failed:", error);
      alert(language === 'tr' ? 'Bir hata oluştu' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const t = {
    tr: {
      title: "Hoş Geldiniz!",
      subtitle: "Hesabınızı kuralım",
      name: "Adınız",
      device: "Hangi cihazdan kullanıyorsunuz?",
      mobile: "Mobil",
      desktop: "Bilgisayar",
      promoCode: "Promo Kodu (Opsiyonel)",
      promoPlaceholder: "Promo kodunuz varsa girin",
      continue: "Devam Et",
      credits: "20 kredi ile başlayacaksınız!"
    },
    en: {
      title: "Welcome!",
      subtitle: "Let's set up your account",
      name: "Your Name",
      device: "Which device are you using?",
      mobile: "Mobile",
      desktop: "Desktop",
      promoCode: "Promo Code (Optional)",
      promoPlaceholder: "Enter promo code if you have one",
      continue: "Continue",
      credits: "You'll start with 20 credits!"
    }
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/60 backdrop-blur-xl rounded-full p-1.5 flex gap-1 shadow-xl border border-amber-200/50">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
              language === 'en' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg' 
                : 'text-amber-800/70 hover:text-amber-900'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('tr')}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
              language === 'tr' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg' 
                : 'text-amber-800/70 hover:text-amber-900'
            }`}
          >
            TR
          </button>
        </div>
      </div>

      {/* Setup form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-xl">
                <Bot className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-amber-900 mb-2">
            {t.title}
          </h1>
          <p className="text-center text-amber-700 mb-6">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-900"
                required
              />
            </div>

            {/* Device Preference */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-3">
                {t.device}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDevicePreference("mobile")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    devicePreference === "mobile"
                      ? "border-amber-600 bg-amber-50 shadow-lg"
                      : "border-amber-300/50 bg-white/50 hover:bg-white/80"
                  }`}
                >
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-amber-700" />
                  <span className="block text-sm font-semibold text-amber-900">
                    {t.mobile}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreference("desktop")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    devicePreference === "desktop"
                      ? "border-amber-600 bg-amber-50 shadow-lg"
                      : "border-amber-300/50 bg-white/50 hover:bg-white/80"
                  }`}
                >
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-amber-700" />
                  <span className="block text-sm font-semibold text-amber-900">
                    {t.desktop}
                  </span>
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                {t.promoCode}
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t.promoPlaceholder}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-900 placeholder-amber-600/40"
              />
            </div>

            {/* Credits info */}
            <div className="bg-amber-100/50 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-sm font-semibold text-amber-800">{t.credits}</p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !firstName.trim() || !devicePreference}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'tr' ? 'Kuruluyor...' : 'Setting up...'}
                </>
              ) : (
                t.continue
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
