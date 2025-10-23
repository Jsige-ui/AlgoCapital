import { useState } from "react";
import { useForm } from "react-hook-form@7.55.0";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { WalletConnect } from "./WalletConnect";

interface InvestorFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

interface InvestorFormData {
  fullName: string;
  investorType: string;
  country: string;
  email: string;
  investmentExperience: string;
  investmentRange: string;
  agreeRisks: boolean;
}

export function InvestorForm({ onBack, onSubmit, onWalletConnect, onWalletDisconnect }: InvestorFormProps) {
  const [step, setStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InvestorFormData>();
  
  const agreeRisks = watch("agreeRisks");
  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const onNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const onPrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onFormSubmit = (data: InvestorFormData) => {
    if (!data.agreeRisks) {
      toast.error("Please acknowledge investment risks");
      return;
    }
    
    toast.success("Registration complete!");
    onSubmit({ ...data, userType: "investor" });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Wallet button - fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <WalletConnect onConnect={onWalletConnect} onDisconnect={onWalletDisconnect} />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00D4FF] rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-white/70 hover:text-white font-poppins"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-xl blur-xl" />
          <div className="relative bg-black/80 border-2 border-[#00D4FF] rounded-xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-cyan-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-orbitron text-white">Investor Registration</h2>
                <p className="font-poppins text-white/60">Complete your profile</p>
              </div>
            </div>
            
            {/* Progress */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between font-poppins text-white/60">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white font-poppins">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register("fullName", { required: "Full name is required" })}
                      placeholder="Jane Smith"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#00D4FF]"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 font-poppins">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investorType" className="text-white font-poppins">Investor Type *</Label>
                    <Select onValueChange={(value) => setValue("investorType", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                        <SelectValue placeholder="Select investor type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#00D4FF]">
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="angel">Angel Investor</SelectItem>
                        <SelectItem value="vc">VC Firm</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("investorType", { required: "Investor type is required" })} />
                    {errors.investorType && (
                      <p className="text-red-400 font-poppins">{errors.investorType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white font-poppins">Country of Residence *</Label>
                    <Input
                      id="country"
                      {...register("country", { required: "Country is required" })}
                      placeholder="United States"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#00D4FF]"
                    />
                    {errors.country && (
                      <p className="text-red-400 font-poppins">{errors.country.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-poppins">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      placeholder="jane@example.com"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#00D4FF]"
                    />
                    {errors.email && (
                      <p className="text-red-400 font-poppins">{errors.email.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={onNextStep}
                    className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-black font-orbitron border-2 border-[#00D4FF]"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="investmentExperience" className="text-white font-poppins">Investment Experience *</Label>
                    <Select onValueChange={(value) => setValue("investmentExperience", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#00D4FF]">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("investmentExperience", { required: "Investment experience is required" })} />
                    {errors.investmentExperience && (
                      <p className="text-red-400 font-poppins">{errors.investmentExperience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investmentRange" className="text-white font-poppins">Preferred Investment Range *</Label>
                    <Select onValueChange={(value) => setValue("investmentRange", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#00D4FF]">
                        <SelectItem value="100-1000">$100 - $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("investmentRange", { required: "Investment range is required" })} />
                    {errors.investmentRange && (
                      <p className="text-red-400 font-poppins">{errors.investmentRange.message}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <Checkbox
                      id="agreeRisks"
                      checked={agreeRisks}
                      onCheckedChange={(checked) => setValue("agreeRisks", checked as boolean)}
                      className="border-amber-500"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreeRisks" className="cursor-pointer text-white font-poppins">
                        I understand investment risks *
                      </Label>
                      <p className="text-white/60 font-poppins">
                        Investing in startups carries risks including potential loss of capital.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={onPrevStep}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/5 font-orbitron"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-black font-orbitron border-2 border-[#00D4FF]"
                      disabled={!agreeRisks}
                    >
                      Explore Projects
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
