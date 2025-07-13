import {
  AboutUsSection,
  HeroSection,
  IntroduceSection,
  Particles,
  ShoeListSection,
} from "@/components";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Particles />
      <div className="relative z-10">
        <HeroSection />
        <IntroduceSection />
        <ShoeListSection />
        <AboutUsSection />
      </div>
    </div>
  );
};

export default Home;
