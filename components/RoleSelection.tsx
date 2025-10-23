import { Button } from "./ui/button";
import { Rocket, TrendingUp, Sparkles } from "lucide-react";
import { WalletConnect } from "./WalletConnect";

interface RoleSelectionProps {
  onRoleSelect: (role: "founder" | "investor") => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

export function RoleSelection({ onRoleSelect, onWalletConnect, onWalletDisconnect }: RoleSelectionProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Wallet button - fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <WalletConnect onConnect={onWalletConnect} onDisconnect={onWalletDisconnect} />
      </div>

      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00D4FF] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1 mb-4">
            <h2 className="font-orbitron text-white glow-white">
              AlgoCap
              <Sparkles className="inline w-5 h-5 mx-1 text-[#00D4FF]" />
              ital
              <Sparkles className="inline w-5 h-5 mx-1 text-[#00D4FF]" />
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16 animate-in fade-in duration-500">
          <h1 className="font-orbitron text-white glow-white">
            Where Vision Meets Capital
          </h1>
          <p className="font-poppins text-white/80 max-w-2xl mx-auto">
            Build the future or fund it. Your journey starts here.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founder Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-black/80 border-2 border-[#8A2BE2] rounded-xl p-8 hover:border-[#8A2BE2]/80 transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8A2BE2] to-purple-700 rounded-xl flex items-center justify-center border-glow-purple">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-orbitron text-[#8A2BE2] glow-purple">
                    FOUNDER
                  </h3>
                  <p className="font-poppins text-white/70">
                    Launch your project and raise capital from our community of investors
                  </p>
                </div>
                <Button
                  onClick={() => onRoleSelect("founder")}
                  size="lg"
                  className="font-orbitron w-full bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white border-2 border-[#8A2BE2] hover:border-[#8A2BE2]/80 border-glow-purple"
                >
                  I'M A FOUNDER
                </Button>
              </div>
            </div>
          </div>

          {/* Investor Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-black/80 border-2 border-[#00D4FF] rounded-xl p-8 hover:border-[#00D4FF]/80 transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00D4FF] to-cyan-600 rounded-xl flex items-center justify-center border-glow-blue">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-orbitron text-[#00D4FF] glow-blue">
                    INVESTOR
                  </h3>
                  <p className="font-poppins text-white/70">
                    Discover and invest in tomorrow's success stories today
                  </p>
                </div>
                <Button
                  onClick={() => onRoleSelect("investor")}
                  size="lg"
                  className="font-orbitron w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-black border-2 border-[#00D4FF] hover:border-[#00D4FF]/80 border-glow-blue"
                >
                  I'M AN INVESTOR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
