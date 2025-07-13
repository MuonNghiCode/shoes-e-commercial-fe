import React from "react";
import {
  AboutUsSection,
  HeroSection,
  IntroduceSection,
  ShoeListSection,
} from "@/components/home";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <IntroduceSection />
      <ShoeListSection />
      <AboutUsSection />
    </>
  );
};

export default Home;
