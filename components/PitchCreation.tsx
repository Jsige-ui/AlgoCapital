import { useState } from "react";
import { useForm } from "react-hook-form@7.55.0";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Rocket, Video, FileText, Image as ImageIcon, DollarSign } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { WalletConnect } from "./WalletConnect";

interface PitchCreationProps {
  onSubmit: (data: any) => void;
  onViewGallery: () => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

interface PitchFormData {
  projectTitle: string;
  elevatorPitch: string;
  detailedDescription: string;
  fundingGoal: string;
  equityPercentage: string;
  timeline: string;
  category: string;
}

export function PitchCreation({ onSubmit, onViewGallery, onWalletConnect, onWalletDisconnect }: PitchCreationProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PitchFormData>();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const elevatorPitch = watch("elevatorPitch") || "";
  const detailedDescription = watch("detailedDescription") || "";

  const onFormSubmit = (data: PitchFormData) => {
    toast.success("Project launching...");
    onSubmit({ ...data, images: uploadedImages });
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
            className="absolute w-1 h-1 bg-[#8A2BE2] rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8A2BE2] to-purple-700 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="font-orbitron text-white glow-white mb-2">
            Craft Your Investment Pitch
          </h1>
          <p className="font-poppins text-[#00D4FF]">
            This is what investors will see. Make it compelling!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Basic Info Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
            <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="font-orbitron text-white mb-4">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="projectTitle" className="text-white font-poppins">
                  Project Title *
                </Label>
                <Input
                  id="projectTitle"
                  {...register("projectTitle", { 
                    required: "Project title is required",
                    maxLength: { value: 60, message: "Max 60 characters" }
                  })}
                  placeholder="Your Amazing Project Name"
                  className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                  maxLength={60}
                />
                <div className="flex justify-between font-poppins text-white/60">
                  {errors.projectTitle && (
                    <p className="text-red-400">{errors.projectTitle.message}</p>
                  )}
                  <span className="ml-auto">{watch("projectTitle")?.length || 0}/60</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevatorPitch" className="text-white font-poppins">
                  Elevator Pitch (140-character hook) *
                </Label>
                <Textarea
                  id="elevatorPitch"
                  {...register("elevatorPitch", { 
                    required: "Elevator pitch is required",
                    maxLength: { value: 140, message: "Max 140 characters" }
                  })}
                  placeholder="A compelling one-liner that captures your vision..."
                  className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2] h-20"
                  maxLength={140}
                />
                <div className="flex justify-between font-poppins text-white/60">
                  {errors.elevatorPitch && (
                    <p className="text-red-400">{errors.elevatorPitch.message}</p>
                  )}
                  <span className="ml-auto">{elevatorPitch.length}/140</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white font-poppins">
                  Business Category *
                </Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#8A2BE2]">
                    <SelectItem value="tech">🚀 Tech</SelectItem>
                    <SelectItem value="food">🍔 Food & Beverage</SelectItem>
                    <SelectItem value="retail">🛍️ Retail</SelectItem>
                    <SelectItem value="services">💼 Services</SelectItem>
                    <SelectItem value="creative">🎨 Creative</SelectItem>
                    <SelectItem value="social">🌍 Social Impact</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("category", { required: "Category is required" })} />
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
            <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="font-orbitron text-white mb-4">Detailed Description</h3>

              <div className="space-y-2">
                <Label htmlFor="detailedDescription" className="text-white font-poppins">
                  Tell Your Story *
                </Label>
                <Textarea
                  id="detailedDescription"
                  {...register("detailedDescription", { 
                    required: "Detailed description is required",
                    minLength: { value: 100, message: "Min 100 characters" }
                  })}
                  placeholder="What problem are you solving? What makes your solution unique? What's your vision for the future?"
                  className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2] min-h-[200px]"
                />
                <div className="flex justify-between font-poppins text-white/60">
                  {errors.detailedDescription && (
                    <p className="text-red-400">{errors.detailedDescription.message}</p>
                  )}
                  <span className="ml-auto">{detailedDescription.length} characters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
            <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="font-orbitron text-white mb-4">Media & Documents</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#8A2BE2] transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="font-poppins text-white/60">Pitch Deck (PDF)</p>
                  <p className="font-poppins text-white/40">Optional</p>
                </div>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#8A2BE2] transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="font-poppins text-white/60">Product Images</p>
                  <p className="font-poppins text-white/40">Max 5</p>
                </div>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#8A2BE2] transition-colors cursor-pointer">
                  <Video className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="font-poppins text-white/60">Video Pitch</p>
                  <p className="font-poppins text-white/40">URL Optional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Details */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
            <div className="relative bg-black/80 border-2 border-[#8A2BE2]/50 rounded-xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="font-orbitron text-white mb-4">Funding Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fundingGoal" className="text-white font-poppins">
                    Funding Goal *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      id="fundingGoal"
                      {...register("fundingGoal", { required: "Funding goal is required" })}
                      placeholder="100000"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2] pl-10"
                    />
                  </div>
                  {errors.fundingGoal && (
                    <p className="text-red-400 font-poppins">{errors.fundingGoal.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equityPercentage" className="text-white font-poppins">
                    Equity/Revenue Share *
                  </Label>
                  <Input
                    id="equityPercentage"
                    {...register("equityPercentage", { required: "Equity percentage is required" })}
                    placeholder="10%"
                    className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                  />
                  {errors.equityPercentage && (
                    <p className="text-red-400 font-poppins">{errors.equityPercentage.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-white font-poppins">
                    Timeline (months) *
                  </Label>
                  <Input
                    id="timeline"
                    type="number"
                    {...register("timeline", { required: "Timeline is required" })}
                    placeholder="12"
                    className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                  />
                  {errors.timeline && (
                    <p className="text-red-400 font-poppins">{errors.timeline.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-xl blur-xl" />
            <div className="relative bg-black/80 border-2 border-[#00D4FF]/50 rounded-xl p-6 backdrop-blur-sm text-center space-y-4">
              <p className="font-poppins text-white">
                Ready to launch? Your project will be live immediately after verification.
              </p>
              <Button
                type="submit"
                size="lg"
                className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-black font-orbitron border-2 border-[#00D4FF] px-12"
              >
                LAUNCH PROJECT
              </Button>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onViewGallery}
                  className="font-poppins text-white/60 hover:text-[#00D4FF] transition-colors"
                >
                  Want to invest instead? → Explore Opportunities
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
