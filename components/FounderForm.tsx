import { useState } from "react";
import { useForm } from "react-hook-form@7.55.0";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { ArrowLeft, Rocket } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { WalletConnect } from "./WalletConnect";

interface FounderFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  onWalletConnect?: (address: string) => void;
  onWalletDisconnect?: () => void;
}

interface FounderFormData {
  fullName: string;
  businessName: string;
  businessType: string;
  registrationNumber: string;
  businessAge: string;
  email: string;
  phone: string;
  fundingGoal: string;
  description: string;
  agreeVerification: boolean;
}

export function FounderForm({ onBack, onSubmit, onWalletConnect, onWalletDisconnect }: FounderFormProps) {
  const [step, setStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FounderFormData>();
  
  const agreeVerification = watch("agreeVerification");
  const totalSteps = 3;
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

  const onFormSubmit = (data: FounderFormData) => {
    if (!data.agreeVerification) {
      toast.error("Please agree to the verification process");
      return;
    }
    
    toast.success("Basic details submitted!");
    onSubmit({ ...data, userType: "founder" });
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
            className="absolute w-1 h-1 bg-[#8A2BE2] rounded-full animate-pulse"
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent rounded-xl blur-xl" />
          <div className="relative bg-black/80 border-2 border-[#8A2BE2] rounded-xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8A2BE2] to-purple-700 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-orbitron text-white">Founder Registration</h2>
                <p className="font-poppins text-white/60">Complete your basic details</p>
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
                      placeholder="John Doe"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 font-poppins">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-white font-poppins">Business Name *</Label>
                    <Input
                      id="businessName"
                      {...register("businessName", { required: "Business name is required" })}
                      placeholder="Your Company Inc."
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.businessName && (
                      <p className="text-red-400 font-poppins">{errors.businessName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-white font-poppins">Business Type *</Label>
                    <Select onValueChange={(value) => setValue("businessType", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#8A2BE2]">
                        <SelectItem value="tech">Tech Startup</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("businessType", { required: "Business type is required" })} />
                    {errors.businessType && (
                      <p className="text-red-400 font-poppins">{errors.businessType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-white font-poppins">Business Registration Number *</Label>
                    <Input
                      id="registrationNumber"
                      {...register("registrationNumber", { required: "Registration number is required" })}
                      placeholder="123456789"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.registrationNumber && (
                      <p className="text-red-400 font-poppins">{errors.registrationNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAge" className="text-white font-poppins">Business Age *</Label>
                    <Select onValueChange={(value) => setValue("businessAge", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white font-poppins">
                        <SelectValue placeholder="Select business age" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#8A2BE2]">
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="under1year">Under 1 year</SelectItem>
                        <SelectItem value="1-3years">1-3 years</SelectItem>
                        <SelectItem value="3plus">3+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("businessAge", { required: "Business age is required" })} />
                    {errors.businessAge && (
                      <p className="text-red-400 font-poppins">{errors.businessAge.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={onNextStep}
                    className="w-full bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white font-orbitron border-2 border-[#8A2BE2]"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
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
                      placeholder="john@example.com"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.email && (
                      <p className="text-red-400 font-poppins">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-poppins">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone", { required: "Phone number is required" })}
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.phone && (
                      <p className="text-red-400 font-poppins">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fundingGoal" className="text-white font-poppins">Funding Goal Amount (USD/ALGO) *</Label>
                    <Input
                      id="fundingGoal"
                      {...register("fundingGoal", { required: "Funding goal is required" })}
                      placeholder="$100,000 or 50,000 ALGO"
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                    />
                    {errors.fundingGoal && (
                      <p className="text-red-400 font-poppins">{errors.fundingGoal.message}</p>
                    )}
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
                      type="button"
                      onClick={onNextStep}
                      className="flex-1 bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white font-orbitron border-2 border-[#8A2BE2]"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white font-poppins">Brief Business Description *</Label>
                    <Textarea
                      id="description"
                      {...register("description", { 
                        required: "Description is required",
                        maxLength: {
                          value: 200,
                          message: "Description must be 200 characters or less"
                        }
                      })}
                      placeholder="Describe your business..."
                      className="bg-white/5 border-white/20 text-white font-poppins focus:border-[#8A2BE2]"
                      maxLength={200}
                    />
                    <div className="flex justify-between font-poppins text-white/60">
                      {errors.description && (
                        <p className="text-red-400">{errors.description.message}</p>
                      )}
                      <span className="ml-auto">{watch("description")?.length || 0}/200</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-[#8A2BE2]/10 rounded-lg border border-[#8A2BE2]/30">
                    <Checkbox
                      id="agreeVerification"
                      checked={agreeVerification}
                      onCheckedChange={(checked) => setValue("agreeVerification", checked as boolean)}
                      className="border-[#8A2BE2]"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreeVerification" className="cursor-pointer text-white font-poppins">
                        I agree to verification process *
                      </Label>
                      <p className="text-white/60 font-poppins">
                        Your business information will be verified for authenticity.
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
                      className="flex-1 bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white font-orbitron border-2 border-[#8A2BE2]"
                      disabled={!agreeVerification}
                    >
                      Continue to Pitch
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
