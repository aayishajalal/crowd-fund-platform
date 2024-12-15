// src/pages/BrowseCampaigns.js
import React, { useState, useEffect } from 'react';
import CampaignCard from '../components/CampaignCard'; // assuming the CampaignCard component is used to display each campaign

const BrowseCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns data from API or mock data
    const fetchCampaigns = async () => {
      // Replace with actual API call
      const data = [
        { title: 'Campaign 1', description: 'Description of Campaign 1', image: 'https://via.placeholder.com/300' },
        { title: 'Campaign 2', description: 'Description of Campaign 2', image: 'https://via.placeholder.com/300' },
      ];
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Browse Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCampaigns;
