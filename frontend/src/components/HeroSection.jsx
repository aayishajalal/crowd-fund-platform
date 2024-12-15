// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-20 text-center text-white bg-gray-800">
      <h1 className="mb-6 text-5xl font-extrabold">Welcome to Decentralized Crowdfunding</h1>
      <p className="mb-8 text-xl">Start a campaign, support a cause, and create a lasting impact with the power of blockchain technology.</p>
      <div>
        <Link to="/create-campaign">
          <button className="px-8 py-4 mr-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700">
            Start a Campaign
          </button>
        </Link>
        <Link to="/browse-campaigns">
          <button className="px-8 py-4 text-lg font-bold text-white bg-green-500 rounded-lg hover:bg-green-700">
            Explore Campaigns
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
