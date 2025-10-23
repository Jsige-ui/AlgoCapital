import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Rocket, 
  Share2, 
  Copy, 
  TrendingUp, 
  Eye, 
  Users, 
  DollarSign,
  Edit,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { WalletConnect } from "./WalletConnect";

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
}

interface FounderDashboardProps {
  project: Project;
  onViewGallery: () => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

export function FounderDashboard({ project, onViewGallery }: FounderDashboardProps) {
  const [copied, setCopied] = useState(false);
  const fundingProgress = (project.currentFunding / project.fundingGoal) * 100;

  // Mock data
  const stats = {
    views: 1247,
    clicks: 89,
    conversionRate: 7.1,
    investors: 12,
  };

  const recentInvestors = [
    { name: "Sarah M.", amount: 5000, time: "2 hours ago" },
    { name: "John D.", amount: 2500, time: "5 hours ago" },
    { name: "Alex K.", amount: 10000, time: "1 day ago" },
    { name: "Maria L.", amount: 3500, time: "1 day ago" },
    { name: "Tom R.", amount: 7500, time: "2 days ago" },
  ];

  const handleCopyLink = () => {
    const link = `algocapital.com/project/${project.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Project link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    toast.success(`Sharing on ${platform}...`);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#8A2BE2] rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8A2BE2] to-purple-700 rounded-xl flex items-center justify-center float-animation">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-orbitron text-white glow-white mb-2">
            Your Project is Live! 🚀
          </h1>
          <p className="font-poppins text-[#00D4FF]">
            Share your project link and track your funding progress
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Performance */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
              <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-orbitron text-white">Project Performance</h2>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2]/10 font-poppins"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Pitch
                  </Button>
                </div>

                {/* Funding Progress */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-poppins text-white/60 mb-1">Raised so far</p>
                      <h3 className="font-orbitron text-white">
                        ${project.currentFunding.toLocaleString()}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="font-poppins text-white/60 mb-1">Goal</p>
                      <p className="font-poppins text-[#00D4FF]">
                        ${project.fundingGoal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Progress value={fundingProgress} className="h-3 bg-white/10" />
                  <p className="font-poppins text-white/60 text-right">
                    {Math.round(fundingProgress)}% funded
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-[#00D4FF]" />
                      <p className="font-poppins text-white/60">Views</p>
                    </div>
                    <p className="font-orbitron text-white">{stats.views}</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#00D4FF]" />
                      <p className="font-poppins text-white/60">Clicks</p>
                    </div>
                    <p className="font-orbitron text-white">{stats.clicks}</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[#00D4FF]" />
                      <p className="font-poppins text-white/60">Investors</p>
                    </div>
                    <p className="font-orbitron text-white">{stats.investors}</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-[#00D4FF]" />
                      <p className="font-poppins text-white/60">Conv. Rate</p>
                    </div>
                    <p className="font-orbitron text-white">{stats.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Investors */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-xl blur-xl" />
              <div className="relative bg-black/80 border-2 border-[#00D4FF]/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-orbitron text-white mb-4">Recent Investors</h3>
                <div className="space-y-3">
                  {recentInvestors.map((investor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00D4FF] to-cyan-600 rounded-full flex items-center justify-center font-orbitron text-white">
                          {investor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-poppins text-white">{investor.name}</p>
                          <p className="font-poppins text-white/60">{investor.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-orbitron text-[#00D4FF]">
                          ${investor.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Share Tools */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
              <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-orbitron text-white mb-4">Share Your Project</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleCopyLink}
                    className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/20 font-poppins"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Project Link
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleShare("Twitter")}
                    className="w-full bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-white border border-[#1DA1F2] font-poppins"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share on Twitter
                  </Button>

                  <Button
                    onClick={() => handleShare("LinkedIn")}
                    className="w-full bg-[#0077B5]/20 hover:bg-[#0077B5]/30 text-white border border-[#0077B5] font-poppins"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share on LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-xl blur-xl" />
              <div className="relative bg-black/80 border-2 border-[#00D4FF]/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-orbitron text-white mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/5 font-poppins"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Post Update
                  </Button>

                  <Button
                    onClick={onViewGallery}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/5 font-poppins"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View in Gallery
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
              <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-orbitron text-white mb-4">{project.title}</h3>
                <p className="font-poppins text-white/70 mb-4">{project.elevatorPitch}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#8A2BE2]/20 border border-[#8A2BE2] rounded-full font-poppins text-[#8A2BE2]">
                    {project.category}
                  </span>
                  {project.verified && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500 rounded-full font-poppins text-green-400">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#8A2BE2]/10 rounded-xl blur-xl" />
          <div className="relative bg-black/80 border-2 border-white/20 rounded-xl p-6 backdrop-blur-sm text-center">
            <p className="font-poppins text-white/70 mb-4">
              See how your project appears to investors and discover other opportunities
            </p>
            <Button
              onClick={onViewGallery}
              size="lg"
              className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-black font-orbitron border-2 border-[#00D4FF]"
            >
              Browse Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing Check icon import
function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
