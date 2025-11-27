import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const { exchangeCodeForSessionToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        
        // Wait a moment for session to be established
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if user has a profile
        const profileResponse = await fetch("/api/profile");
        
        if (!profileResponse.ok) {
          console.error("Profile fetch failed:", profileResponse.status);
          navigate("/");
          return;
        }
        
        const profile = await profileResponse.json();
        
        if (profile && profile.id) {
          // Profile exists, go to chat
          navigate("/chat");
        } else {
          // No profile, go to setup
          navigate("/setup");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/");
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="animate-spin">
        <Loader2 className="w-12 h-12 text-amber-900" />
      </div>
      <p className="mt-4 text-amber-900 font-semibold">Logging you in...</p>
    </div>
  );
}
