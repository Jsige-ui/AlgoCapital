import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface SplashPageProps {
  onEnter: () => void;
}

export function SplashPage({ onEnter }: SplashPageProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showItal, setShowItal] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Animation sequence
    setTimeout(() => setShowLogo(true), 300);
    setTimeout(() => setShowItal(true), 1200);
    setTimeout(() => setShowSubtitle(true), 2000);
    setTimeout(() => setShowButton(true), 3000);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo animation */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1">
            <h1
              className={`font-orbitron text-white glow-white transition-all duration-1000 ${
                showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ fontSize: "4rem", letterSpacing: "0.1em" }}
            >
              AlgoCap
              <span
                className={`inline-flex items-center transition-all duration-1000 ${
                  showItal ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <Sparkles className="w-6 h-6 mx-1 text-[#00D4FF]" />
                <span>ital</span>
                <Sparkles className="w-6 h-6 mx-1 text-[#00D4FF]" />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className={`font-poppins text-[#00D4FF] glow-blue transition-all duration-1000 ${
              showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Where Startups Come True
          </p>
        </div>

        {/* Enter button */}
        <div
          className={`pt-12 transition-all duration-1000 ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={onEnter}
            size="lg"
            className="font-orbitron bg-transparent border-2 border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10 px-12 py-6 pulse-glow"
          >
            ENTER
          </Button>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
}