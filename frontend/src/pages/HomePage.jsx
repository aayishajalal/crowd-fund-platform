// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import FeaturedCampaigns from "../components/FeaturedCampaigns";
import HowItWorks from "../components/HowItWorks";
const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <HeroSection />
        <FeaturedCampaigns />
        <HowItWorks />
      </div>
    </>
  );
};

export default HomePage;
