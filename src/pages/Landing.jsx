import BottomCTA from "../features/landing/BottomCTA";
import FeaturesSection from "../features/landing/FeaturesSection";
import HeroSection from "../features/landing/HeroSection";
import HowItWorksSection from "../features/landing/HowItWorksSection";
import StatsSection from "../features/landing/StatsSection";
import TargetAudienceSection from "../features/landing/TargetAudienceSection";

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TargetAudienceSection />
      <BottomCTA />
    </div>
  );
};

export default Landing;
