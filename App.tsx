import { useState } from "react";
import { SplashPage } from "./components/SplashPage";
import { RoleSelection } from "./components/RoleSelection";
import { FounderForm } from "./components/FounderForm";
import { InvestorForm } from "./components/InvestorForm";
import { PitchCreation } from "./components/PitchCreation";
import { BusinessGallery } from "./components/BusinessGallery";
import { FounderDashboard } from "./components/FounderDashboard";
import { InvestorDashboard } from "./components/InvestorDashboard";
import { ProjectDetails } from "./components/ProjectDetails";
import { Toaster } from "./components/ui/sonner";

type PageFlow =
  | "splash"
  | "roleSelection"
  | "founderForm"
  | "investorForm"
  | "pitchCreation"
  | "businessGallery"
  | "founderDashboard"
  | "investorDashboard"
  | "projectDetails";

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

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageFlow>("splash");
  const [founderData, setFounderData] = useState<any>(null);
  const [, setInvestorData] = useState<any>(null);
  const [currentProject, setCurrentProject] =
    useState<Project | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [walletAddress, setWalletAddress] = useState<
    string | null
  >(null);

  const handleEnter = () => {
    setCurrentPage("roleSelection");
  };

  const handleRoleSelect = (role: "founder" | "investor") => {
    if (role === "founder") {
      setCurrentPage("founderForm");
    } else {
      setCurrentPage("investorForm");
    }
  };

  const handleFounderSubmit = (data: any) => {
    setFounderData(data);
    setCurrentPage("pitchCreation");
  };

  const handleInvestorSubmit = (data: any) => {
    setInvestorData(data);
    setCurrentPage("investorDashboard");
  };

  const handlePitchSubmit = (pitchData: any) => {
    const project: Project = {
      id: Date.now().toString(),
      title: pitchData.projectTitle,
      description: pitchData.detailedDescription,
      elevatorPitch: pitchData.elevatorPitch,
      fundingGoal: parseFloat(pitchData.fundingGoal),
      currentFunding: 0,
      category: pitchData.category,
      images: pitchData.images || [],
      founderName: founderData?.fullName || "Anonymous",
      verified: true,
      trending: false,
    };
    setCurrentProject(project);
    setCurrentPage("founderDashboard");
  };

  const handleViewGallery = () => {
    setCurrentPage("businessGallery");
  };

  const handleBackToRole = () => {
    setCurrentPage("roleSelection");
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleWalletDisconnect = () => {
    setWalletAddress(null);
  };

  const handleViewProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage("projectDetails");
  };

  const handleBackToGallery = () => {
    setCurrentPage("businessGallery");
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster />

      {currentPage === "splash" && (
        <SplashPage onEnter={handleEnter} />
      )}

      {currentPage === "roleSelection" && (
        <RoleSelection
          onRoleSelect={handleRoleSelect}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "founderForm" && (
        <FounderForm
          onBack={handleBackToRole}
          onSubmit={handleFounderSubmit}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "investorForm" && (
        <InvestorForm
          onBack={handleBackToRole}
          onSubmit={handleInvestorSubmit}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "pitchCreation" && (
        <PitchCreation
          onSubmit={handlePitchSubmit}
          onViewGallery={handleViewGallery}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "businessGallery" && (
        <BusinessGallery
          currentProject={currentProject}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
          onViewProject={handleViewProjectDetails}
        />
      )}

      {currentPage === "investorDashboard" && (
        <InvestorDashboard
          onViewGallery={handleViewGallery}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "projectDetails" && selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onBack={handleBackToGallery}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}

      {currentPage === "founderDashboard" && currentProject && (
        <FounderDashboard
          project={currentProject}
          onViewGallery={handleViewGallery}
        />
      )}
    </div>
  );
}