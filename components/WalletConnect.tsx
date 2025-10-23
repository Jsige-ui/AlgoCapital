import { useState, useEffect } from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  portfolioValue?: number;
  totalEarnings?: number;
}

export function WalletConnect({ onConnect, onDisconnect, portfolioValue = 245.50, totalEarnings = 45.50 }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("peraWalletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
      onConnect?.(savedAddress);
    }
  }, [onConnect]);

  const connectWallet = async (walletType: string) => {
    try {
      // In a real implementation, this would use @perawallet/connect
      // For now, we'll simulate the connection
      
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate a mock Algorand address (58 characters)
      const mockAddress = "8A2" + Array.from({ length: 52 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]
      ).join('') + "E2FF";
      
      setWalletAddress(mockAddress);
      localStorage.setItem("peraWalletAddress", mockAddress);
      localStorage.setItem("walletType", walletType);
      setShowWalletModal(false);
      onConnect?.(mockAddress);
      
      // Note: In production, use actual wallet connection:
      // const peraWallet = new PeraWalletConnect();
      // const accounts = await peraWallet.connect();
      // setWalletAddress(accounts[0]);
      
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setShowWalletModal(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem("peraWalletAddress");
    setIsOpen(false);
    onDisconnect?.();
    
    // Note: In production, use actual Pera Wallet:
    // peraWallet.disconnect();
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!walletAddress) {
    return (
      <>
        <Button
          onClick={() => setShowWalletModal(true)}
          className="relative bg-gradient-to-r from-[#8A2BE2] to-[#00D4FF] hover:from-[#9D3FF5] hover:to-[#1AE4FF] transition-all duration-300 border-0 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
        >
          <Wallet className="w-4 h-4 mr-2" />
          <span className="font-orbitron">Connect Wallet</span>
        </Button>

        {/* Wallet Selection Modal */}
        <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
          <DialogContent className="bg-black/95 border border-[#00D4FF]/30 backdrop-blur-xl shadow-[0_0_50px_rgba(0,212,255,0.3)] max-w-md">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-white glow-white">
                Connect Your Wallet
              </DialogTitle>
              <DialogDescription className="text-white/60 font-poppins">
                Choose a wallet to connect to AlgoCapital
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Pera Wallet */}
              <Button
                onClick={() => connectWallet("Pera")}
                className="h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-[#00D4FF]/30 hover:border-[#00D4FF] transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]"
              >
                <Wallet className="w-8 h-8 text-[#00D4FF] mb-2" />
                <span className="font-orbitron text-white text-sm">Pera Wallet</span>
              </Button>

              {/* Defly Wallet */}
              <Button
                onClick={() => connectWallet("Defly")}
                className="h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-[#8A2BE2]/30 hover:border-[#8A2BE2] transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.2)] hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]"
              >
                <Wallet className="w-8 h-8 text-[#8A2BE2] mb-2" />
                <span className="font-orbitron text-white text-sm">Defly Wallet</span>
              </Button>

              {/* MyAlgo Wallet */}
              <Button
                onClick={() => connectWallet("MyAlgo")}
                className="h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-[#00D4FF]/30 hover:border-[#00D4FF] transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]"
              >
                <Wallet className="w-8 h-8 text-[#00D4FF] mb-2" />
                <span className="font-orbitron text-white text-sm">MyAlgo</span>
              </Button>

              {/* WalletConnect */}
              <Button
                onClick={() => connectWallet("WalletConnect")}
                className="h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-[#8A2BE2]/30 hover:border-[#8A2BE2] transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.2)] hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]"
              >
                <Wallet className="w-8 h-8 text-[#8A2BE2] mb-2" />
                <span className="font-orbitron text-white text-sm">WalletConnect</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="relative bg-gradient-to-r from-[#8A2BE2] to-[#00D4FF] hover:from-[#9D3FF5] hover:to-[#1AE4FF] transition-all duration-300 border-0 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
        >
          <Wallet className="w-4 h-4 mr-2" />
          <span className="font-orbitron">{truncateAddress(walletAddress)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 bg-black/95 border border-[#00D4FF]/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        align="end"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
              <span className="font-orbitron text-sm text-white">Connected</span>
            </div>
            <div className="text-xs text-white/60 font-mono break-all bg-white/5 p-2 rounded border border-white/10">
              {walletAddress}
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-poppins text-sm">Portfolio Value</span>
              <span className="text-white font-orbitron glow-blue">
                {portfolioValue.toFixed(2)} ALGO
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-poppins text-sm">Total Earnings</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#00FF88]" />
                <span className="text-[#00FF88] font-orbitron glow-green">
                  +{totalEarnings.toFixed(2)} ALGO
                </span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={disconnectWallet}
            variant="outline"
            className="w-full border-[#FF2D55]/50 text-[#FF2D55] hover:bg-[#FF2D55]/10 hover:border-[#FF2D55] transition-all duration-300 font-orbitron"
          >
            Disconnect
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
