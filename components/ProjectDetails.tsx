import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  CheckCircle2,
  Target,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { WalletConnect } from "./WalletConnect";
import { toast } from "sonner@2.0.3";

interface Project {
  id: string;
  title: string;
  description: string;
  elevatorPitch: string;
  fundingGoal: number;
  currentFunding: number;
  category: string;
  images: string[];
  founderName: string;
  verified: boolean;
  trending: boolean;
  location?: string;
  monthlyRevenue?: number;
  monthlyReturn?: number;
  revenueShare?: number;
  investorCount?: number;
  payoutConsistency?: number;
  daysLeft?: number;
}

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

export function ProjectDetails({ project, onBack, onWalletConnect, onWalletDisconnect }: ProjectDetailsProps) {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  
  const monthlyReturn = project.monthlyReturn || 0.08;
  const calculatedMonthlyEarnings = investmentAmount * monthlyReturn;
  const projectedTotalReturn = calculatedMonthlyEarnings * 12;
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

  const handleInvest = () => {
    toast.success(`Investment of ${investmentAmount} ALGO initiated!`);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Wallet button - fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <WalletConnect onConnect={onWalletConnect} onDisconnect={onWalletDisconnect} />
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

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-white/70 hover:text-white font-poppins"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="bg-black/80 border-2 border-[#00D4FF] backdrop-blur-sm shadow-[0_0_20px_rgba(0,212,255,0.3)] p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-orbitron text-white glow-white">
                      {project.title}
                    </h1>
                    {project.verified && (
                      <CheckCircle2 className="w-6 h-6 text-[#00FF88]" />
                    )}
                  </div>
                  <p className="text-white/70 font-poppins">
                    by {project.founderName}
                  </p>
                </div>
                <Badge className="bg-[#8A2BE2]/20 text-[#8A2BE2] border-[#8A2BE2]/30">
                  {project.category}
                </Badge>
              </div>

              <p className="text-white/80 font-poppins mb-6">
                {project.elevatorPitch}
              </p>

              {/* Funding Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-poppins">Funding Progress</span>
                  <span className="font-orbitron text-white">
                    {project.currentFunding.toLocaleString()} / {project.fundingGoal.toLocaleString()} ALGO
                  </span>
                </div>
                <Progress value={fundingPercentage} className="h-3 bg-white/10" />
                <div className="flex justify-between text-sm">
                  <span className="text-[#00D4FF] font-orbitron glow-blue">
                    {fundingPercentage.toFixed(0)}% funded
                  </span>
                  <span className="text-white/60 font-poppins">
                    {project.daysLeft || 45} days left
                  </span>
                </div>
              </div>
            </Card>

            {/* Tabs for Details */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-black/50 border border-[#00D4FF]/30">
                <TabsTrigger value="overview" className="flex-1 font-orbitron">Overview</TabsTrigger>
                <TabsTrigger value="earnings" className="flex-1 font-orbitron">Earnings</TabsTrigger>
                <TabsTrigger value="performance" className="flex-1 font-orbitron">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm p-6">
                  <h3 className="font-orbitron text-white mb-4">About This Project</h3>
                  <p className="text-white/70 font-poppins leading-relaxed">
                    {project.description}
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="mt-6">
                <Card className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm p-6">
                  <h3 className="font-orbitron text-white glow-white mb-6">
                    📈 Revenue Sharing Details
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/10">
                      <span className="text-white/70 font-poppins">Revenue Share</span>
                      <span className="font-orbitron text-[#00D4FF] glow-blue">
                        {project.revenueShare || 15}% of monthly profits
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/10">
                      <span className="text-white/70 font-poppins">Distribution</span>
                      <span className="font-orbitron text-white">
                        Every 30 days automatically
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/10">
                      <span className="text-white/70 font-poppins">Payout Consistency</span>
                      <span className="font-orbitron text-[#00FF88] glow-green">
                        {project.payoutConsistency || 94}% (6 months)
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#8A2BE2]/10 to-[#00D4FF]/10 rounded-lg border border-[#00D4FF]/30">
                    <h4 className="font-orbitron text-white mb-3">Investment Formula</h4>
                    <p className="text-white/70 font-poppins text-sm mb-2">
                      For every 1 ALGO invested:
                    </p>
                    <p className="font-orbitron text-[#00D4FF] glow-blue">
                      → {monthlyReturn.toFixed(2)} ALGO monthly return
                    </p>
                    <p className="font-orbitron text-[#8A2BE2] glow-purple mt-2">
                      → ~{(monthlyReturn * 12).toFixed(2)} ALGO yearly return
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="mt-6">
                <Card className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm p-6">
                  <h3 className="font-orbitron text-white mb-6">📊 Performance Metrics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-[#00D4FF]" />
                        <span className="text-white/70 font-poppins text-sm">Monthly Revenue</span>
                      </div>
                      <p className="font-orbitron text-white">
                        {project.monthlyRevenue || 520} ALGO
                      </p>
                      <p className="text-white/50 text-xs font-poppins mt-1">Last 30 days</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-[#8A2BE2]" />
                        <span className="text-white/70 font-poppins text-sm">Active Investors</span>
                      </div>
                      <p className="font-orbitron text-white">
                        {project.investorCount || 45} investors
                      </p>
                      <p className="text-white/50 text-xs font-poppins mt-1">Earning monthly</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-[#00FF88]" />
                        <span className="text-white/70 font-poppins text-sm">Investor ROI</span>
                      </div>
                      <p className="font-orbitron text-[#00FF88] glow-green">
                        {(monthlyReturn * 100).toFixed(1)}% monthly
                      </p>
                      <p className="text-white/50 text-xs font-poppins mt-1">Average return</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-[#FFD700]" />
                        <span className="text-white/70 font-poppins text-sm">Total Distributed</span>
                      </div>
                      <p className="font-orbitron text-white">
                        284 ALGO
                      </p>
                      <p className="text-white/50 text-xs font-poppins mt-1">All time</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Investment Sidebar */}
          <div className="space-y-6">
            {/* Investment Calculator */}
            <Card className="bg-black/80 border-2 border-[#8A2BE2] backdrop-blur-sm shadow-[0_0_20px_rgba(138,43,226,0.3)] p-6 sticky top-6">
              <h3 className="font-orbitron text-white glow-white mb-6">
                💼 Investment Calculator
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="amount" className="text-white/70 font-poppins mb-2 block">
                    Investment Amount (ALGO)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="bg-white/5 border-[#8A2BE2]/30 text-white font-orbitron"
                    min="1"
                  />
                </div>

                <div className="p-4 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-lg border border-[#00D4FF]/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 font-poppins text-sm">Monthly Return</span>
                    <span className="font-orbitron text-[#00D4FF] glow-blue">
                      {calculatedMonthlyEarnings.toFixed(2)} ALGO
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 font-poppins text-sm">Yearly Projection</span>
                    <span className="font-orbitron text-[#00FF88] glow-green">
                      {projectedTotalReturn.toFixed(2)} ALGO
                    </span>
                  </div>
                </div>

                <div className="text-center text-sm text-white/50 font-poppins">
                  ROI: {(monthlyReturn * 100).toFixed(1)}% monthly
                </div>
              </div>

              <Button
                onClick={handleInvest}
                className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#00D4FF] hover:from-[#9D3FF5] hover:to-[#1AE4FF] font-orbitron border-0 shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] transition-all duration-300"
                size="lg"
              >
                INVEST NOW
              </Button>

              <Button
                variant="outline"
                className="w-full mt-3 border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10 font-orbitron"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                CHAT WITH FOUNDER
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-black/80 border border-[#00D4FF]/30 backdrop-blur-sm p-6">
              <h4 className="font-orbitron text-white mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-white/70 font-poppins text-sm">
                    {project.trending ? "Trending Project" : "Verified Project"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-[#8A2BE2]" />
                  <span className="text-white/70 font-poppins text-sm">
                    {fundingPercentage.toFixed(0)}% of goal reached
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-white/70 font-poppins text-sm">
                    {project.investorCount || 45} active investors
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
