import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Search, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
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
  location?: string;
  featured?: boolean;
  justLaunched?: boolean;
  nearlyFunded?: boolean;
}

interface BusinessGalleryProps {
  currentProject: Project | null;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
  onViewProject?: (project: Project) => void;
}

export function BusinessGallery({ currentProject, onWalletConnect, onWalletDisconnect, onViewProject }: BusinessGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock projects
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "AI-Powered Health Diagnostics",
      description: "Revolutionary AI platform for early disease detection",
      elevatorPitch: "Democratizing healthcare through AI-powered diagnostics",
      fundingGoal: 10000,
      currentFunding: 6500,
      category: "tech",
      images: [],
      founderName: "Dr. Sarah Chen",
      verified: true,
      trending: true,
      featured: true,
      nearlyFunded: true,
      location: "San Francisco",
      monthlyRevenue: 520,
      monthlyReturn: 0.08,
      revenueShare: 15,
      investorCount: 45,
      payoutConsistency: 82,
      daysLeft: 45
    },
    {
      id: "2",
      title: "Brew & Code Cafe",
      description: "Coffee shop designed for developers and tech entrepreneurs",
      elevatorPitch: "Premium coffee meets high-speed internet and collaboration spaces",
      fundingGoal: 5000,
      currentFunding: 4100,
      category: "food",
      images: [],
      founderName: "Marcus Johnson",
      verified: true,
      trending: false,
      location: "Seattle",
      monthlyRevenue: 284,
      monthlyReturn: 0.12,
      revenueShare: 18,
      investorCount: 38,
      payoutConsistency: 94,
      daysLeft: 22
    },
    {
      id: "3",
      title: "EcoTech Solutions",
      description: "Green energy solutions for residential properties",
      elevatorPitch: "Making sustainable energy affordable and accessible for everyone",
      fundingGoal: 15000,
      currentFunding: 3500,
      category: "social",
      images: [],
      founderName: "Lisa Park",
      verified: true,
      trending: false,
      justLaunched: true,
      location: "New York",
      monthlyRevenue: 180,
      monthlyReturn: 0.07,
      revenueShare: 12,
      investorCount: 15,
      payoutConsistency: 88,
      daysLeft: 58
    },
    {
      id: "4",
      title: "VirtualFit Studios",
      description: "Immersive VR fitness experiences at home",
      elevatorPitch: "Making fitness fun with virtual reality workouts",
      fundingGoal: 8000,
      currentFunding: 5200,
      category: "tech",
      images: [],
      founderName: "Alex Martinez",
      verified: true,
      trending: true,
      location: "Los Angeles",
      monthlyRevenue: 350,
      monthlyReturn: 0.09,
      revenueShare: 16,
      investorCount: 28,
      payoutConsistency: 91,
      daysLeft: 35
    },
    {
      id: "5",
      title: "Artisan Marketplace",
      description: "Direct-to-consumer platform for local artisans",
      elevatorPitch: "Connecting local artists with global customers",
      fundingGoal: 150000,
      currentFunding: 95000,
      category: "creative",
      images: [],
      founderName: "Emma Wilson",
      verified: true,
      trending: false,
      location: "Portland"
    },
    {
      id: "6",
      title: "GreenEnergy Homes",
      description: "Affordable solar solutions for residential properties",
      elevatorPitch: "Making solar energy accessible to every household",
      fundingGoal: 1000000,
      currentFunding: 650000,
      category: "social",
      images: [],
      founderName: "David Kim",
      verified: true,
      trending: true,
      location: "Austin"
    },
  ];

  // Add current project if it exists
  const allProjects = currentProject 
    ? [{ ...currentProject, justLaunched: true }, ...mockProjects]
    : mockProjects;

  const categories = [
    { id: "all", label: "ALL", icon: "🌐" },
    { id: "tech", label: "TECH", icon: "🚀" },
    { id: "food", label: "FOOD & BEVERAGE", icon: "🍔" },
    { id: "retail", label: "RETAIL", icon: "🛍️" },
    { id: "services", label: "SERVICES", icon: "💼" },
    { id: "creative", label: "CREATIVE", icon: "🎨" },
    { id: "social", label: "SOCIAL IMPACT", icon: "🌍" },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "featured", label: "PROJECTS WE LOVE 💫" },
    { id: "trending", label: "TRENDING 🔥" },
    { id: "nearlyFunded", label: "NEARLY FUNDED ⏳" },
    { id: "justLaunched", label: "JUST LAUNCHED 🚀" },
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "featured" && project.featured) ||
                         (selectedFilter === "trending" && project.trending) ||
                         (selectedFilter === "nearlyFunded" && project.nearlyFunded) ||
                         (selectedFilter === "justLaunched" && project.justLaunched);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Wallet button - fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <WalletConnect onConnect={onWalletConnect} onDisconnect={onWalletDisconnect} />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(40)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 py-12">
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
          <h1 className="font-orbitron text-white glow-white mb-2">
            Discover Tomorrow's Success Stories
          </h1>
          <p className="font-poppins text-[#00D4FF]">
            Filter and find projects that match your vision
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 sticky top-0 z-20 bg-black/90 backdrop-blur-md border-y border-white/10 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className={`font-orbitron whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? "bg-[#00D4FF] text-black border-[#00D4FF]"
                    : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="outline"
                className={`font-poppins whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-[#8A2BE2]/20 border-[#8A2BE2] text-white"
                    : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <Input
              type="text"
              placeholder="Find AI startups, bakeries, tech projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/20 text-white font-poppins pl-12 py-6 focus:border-[#00D4FF]"
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const fundingProgress = (project.currentFunding / project.fundingGoal) * 100;

            return (
              <div key={project.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#8A2BE2]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-black/80 border-2 border-white/20 rounded-xl overflow-hidden hover:border-[#00D4FF] transition-all duration-300 backdrop-blur-sm">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-[#00D4FF]/20 to-[#8A2BE2]/20 flex items-center justify-center relative">
                    <div className="text-6xl">{categories.find(c => c.id === project.category)?.icon || "🚀"}</div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {project.verified && (
                        <Badge className="bg-green-500/20 border-green-500 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {project.trending && (
                        <Badge className="bg-orange-500/20 border-orange-500 text-orange-400">
                          🔥 Trending
                        </Badge>
                      )}
                      {project.justLaunched && (
                        <Badge className="bg-blue-500/20 border-blue-500 text-blue-400">
                          🚀 New
                        </Badge>
                      )}
                    </div>

                    {project.location && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/10 border-white/20 text-white">
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-orbitron text-white mb-2">{project.title}</h3>
                      <p className="font-poppins text-white/60 line-clamp-2">{project.elevatorPitch}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between font-poppins text-white/80 text-sm">
                        <span>🚀 {project.title.split(' ')[0]}</span>
                      </div>
                      <Progress value={fundingProgress} className="h-2 bg-white/10" />
                      <div className="flex justify-between text-sm">
                        <span className="text-[#00D4FF] font-orbitron glow-blue">
                          {Math.round(fundingProgress)}% funded
                        </span>
                        <span className="text-white/60 font-poppins">
                          {project.daysLeft || 45} days left
                        </span>
                      </div>
                    </div>

                    {/* Earnings Display */}
                    <div className="p-3 bg-gradient-to-br from-[#8A2BE2]/10 to-[#00D4FF]/10 rounded-lg border border-[#00D4FF]/30 space-y-2">
                      <p className="text-white/70 font-poppins text-sm">💰 Investment Terms:</p>
                      <div className="space-y-1">
                        <p className="text-white font-poppins text-sm">
                          • For every <span className="font-orbitron text-[#00D4FF]">1 ALGO</span> invested
                        </p>
                        <p className="text-white font-poppins text-sm">
                          • Earn <span className="font-orbitron text-[#00FF88] glow-green">{(project.monthlyReturn || 0.08).toFixed(2)} ALGO</span> monthly
                        </p>
                        <p className="text-white font-poppins text-sm">
                          • Projected: <span className="font-orbitron text-[#8A2BE2]">{((project.monthlyReturn || 0.08) * 12).toFixed(2)} ALGO</span> yearly
                        </p>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="space-y-2 text-sm">
                      <p className="text-white/60 font-poppins">📊 Performance:</p>
                      <div className="grid grid-cols-1 gap-1">
                        <p className="text-white/70 font-poppins">
                          Total Raised: <span className="text-white font-orbitron">{project.currentFunding.toLocaleString()}</span> of {project.fundingGoal.toLocaleString()} ALGO
                        </p>
                        <p className="text-white/70 font-poppins">
                          Monthly Revenue: <span className="text-[#00D4FF] font-orbitron">{project.monthlyRevenue || 520} ALGO</span>
                        </p>
                        <p className="text-white/70 font-poppins">
                          Investor ROI: <span className="text-[#00FF88] font-orbitron glow-green">{((project.monthlyReturn || 0.08) * 100).toFixed(1)}%</span> monthly
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => onViewProject?.(project)}
                        className="flex-1 bg-gradient-to-r from-[#8A2BE2] to-[#00D4FF] hover:from-[#9D3FF5] hover:to-[#1AE4FF] text-white font-orbitron border-0 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                      >
                        FUND THIS
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewProject?.(project)}
                        className="border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10 font-orbitron"
                      >
                        VIEW DETAILS
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-poppins text-white/60">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
