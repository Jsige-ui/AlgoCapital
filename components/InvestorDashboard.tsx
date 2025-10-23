import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  Wallet, 
  DollarSign, 
  PieChart, 
  ArrowUpRight,
  Sparkles,
  Calendar,
  Target
} from "lucide-react";
import { WalletConnect } from "./WalletConnect";

interface Investment {
  id: string;
  projectTitle: string;
  amountInvested: number;
  monthlyEarnings: number;
  totalEarnings: number;
  roiPercentage: number;
  investmentDate: string;
  category: string;
}

interface InvestorDashboardProps {
  onViewGallery: () => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

export function InvestorDashboard({ onViewGallery, onWalletConnect, onWalletDisconnect }: InvestorDashboardProps) {
  const [investments] = useState<Investment[]>([
    {
      id: "1",
      projectTitle: "AI Assistant Startup",
      amountInvested: 100,
      monthlyEarnings: 8.2,
      totalEarnings: 24.6,
      roiPercentage: 8.2,
      investmentDate: "2024-08-15",
      category: "Tech"
    },
    {
      id: "2",
      projectTitle: "Brew & Code Cafe",
      amountInvested: 75,
      monthlyEarnings: 9.0,
      totalEarnings: 18.0,
      roiPercentage: 12.0,
      investmentDate: "2024-09-01",
      category: "Food & Beverage"
    },
    {
      id: "3",
      projectTitle: "EcoTech Solutions",
      amountInvested: 150,
      monthlyEarnings: 10.5,
      totalEarnings: 21.0,
      roiPercentage: 7.0,
      investmentDate: "2024-09-20",
      category: "Green Energy"
    }
  ]);

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.amountInvested, 0);
  const totalMonthlyIncome = investments.reduce((sum, inv) => sum + inv.monthlyEarnings, 0);
  const totalEarnings = investments.reduce((sum, inv) => sum + inv.totalEarnings, 0);
  const averageROI = investments.reduce((sum, inv) => sum + inv.roiPercentage, 0) / investments.length;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Wallet button - fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <WalletConnect 
          onConnect={onWalletConnect} 
          onDisconnect={onWalletDisconnect}
          portfolioValue={totalPortfolioValue + totalEarnings}
          totalEarnings={totalEarnings}
        />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00D4FF] rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1 mb-4">
            <h2 className="font-orbitron text-white glow-white">
              AlgoCap
              <Sparkles className="inline w-5 h-5 mx-1 text-[#00D4FF]" />
              ital
              <Sparkles className="inline w-5 h-5 mx-1 text-[#00D4FF]" />
            </h2>
          </div>
          <h1 className="font-orbitron text-white glow-white mb-4">
            Investor Dashboard
          </h1>
          <p className="text-white/70 font-poppins">
            Track your investments and earnings in real-time
          </p>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Portfolio */}
          <Card className="bg-black/80 border-2 border-[#00D4FF] backdrop-blur-sm shadow-[0_0_20px_rgba(0,212,255,0.3)] p-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8 text-[#00D4FF]" />
              <Badge className="bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30">Live</Badge>
            </div>
            <p className="text-white/60 font-poppins text-sm mb-2">Total Portfolio</p>
            <p className="font-orbitron text-white glow-blue">
              {(totalPortfolioValue + totalEarnings).toFixed(2)} ALGO
            </p>
          </Card>

          {/* Monthly Income */}
          <Card className="bg-black/80 border-2 border-[#00FF88] backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,136,0.3)] p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-[#00FF88]" />
              <Badge className="bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30">+12%</Badge>
            </div>
            <p className="text-white/60 font-poppins text-sm mb-2">Monthly Income</p>
            <p className="font-orbitron text-white glow-green">
              {totalMonthlyIncome.toFixed(2)} ALGO
            </p>
          </Card>

          {/* Total Earnings */}
          <Card className="bg-black/80 border-2 border-[#8A2BE2] backdrop-blur-sm shadow-[0_0_20px_rgba(138,43,226,0.3)] p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-[#8A2BE2]" />
              <Badge className="bg-[#8A2BE2]/20 text-[#8A2BE2] border-[#8A2BE2]/30">All Time</Badge>
            </div>
            <p className="text-white/60 font-poppins text-sm mb-2">Total Earnings</p>
            <p className="font-orbitron text-white glow-purple">
              +{totalEarnings.toFixed(2)} ALGO
            </p>
          </Card>

          {/* Average ROI */}
          <Card className="bg-black/80 border-2 border-[#FFD700] backdrop-blur-sm shadow-[0_0_20px_rgba(255,215,0,0.3)] p-6">
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-[#FFD700]" />
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">Monthly</Badge>
            </div>
            <p className="text-white/60 font-poppins text-sm mb-2">Avg ROI</p>
            <p className="font-orbitron text-white" style={{ textShadow: "0 0 10px rgba(255,215,0,0.5)" }}>
              {averageROI.toFixed(1)}%
            </p>
          </Card>
        </div>

        {/* Active Investments */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-white glow-white">
              Active Investments
            </h2>
            <Button
              onClick={onViewGallery}
              className="bg-gradient-to-r from-[#8A2BE2] to-[#00D4FF] hover:from-[#9D3FF5] hover:to-[#1AE4FF] font-orbitron border-0 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            >
              Discover Projects
            </Button>
          </div>

          <div className="space-y-4">
            {investments.map((investment) => (
              <Card key={investment.id} className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm hover:border-[#00D4FF] transition-all duration-300 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Project Info */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-orbitron text-white mb-2">
                          {investment.projectTitle}
                        </h3>
                        <Badge className="bg-[#8A2BE2]/20 text-[#8A2BE2] border-[#8A2BE2]/30">
                          {investment.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm font-poppins">
                      <Calendar className="w-4 h-4" />
                      Invested: {new Date(investment.investmentDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div>
                      <p className="text-white/60 font-poppins text-sm mb-1">Invested</p>
                      <p className="font-orbitron text-white">
                        {investment.amountInvested} ALGO
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 font-poppins text-sm mb-1">Monthly</p>
                      <p className="font-orbitron text-[#00FF88] glow-green">
                        +{investment.monthlyEarnings.toFixed(2)} ALGO
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 font-poppins text-sm mb-1">Total Earned</p>
                      <p className="font-orbitron text-[#00D4FF] glow-blue">
                        +{investment.totalEarnings.toFixed(2)} ALGO
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 font-poppins text-sm mb-1">ROI</p>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4 text-[#00FF88]" />
                        <p className="font-orbitron text-[#00FF88] glow-green">
                          {investment.roiPercentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar - Return Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm font-poppins mb-2">
                    <span className="text-white/60">Return Progress</span>
                    <span className="text-white/60">
                      {((investment.totalEarnings / investment.amountInvested) * 100).toFixed(1)}% returned
                    </span>
                  </div>
                  <Progress 
                    value={(investment.totalEarnings / investment.amountInvested) * 100} 
                    className="h-2 bg-white/10"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-orbitron text-white glow-white">
              Earnings History
            </h3>
            <Badge className="bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30">
              Last 6 Months
            </Badge>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded">
            <div className="text-center">
              <Target className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/50 font-poppins">Earnings chart coming soon</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
