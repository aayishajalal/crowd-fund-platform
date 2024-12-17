// src/components/BrowseCampaigns.jsx
import React, { useState, useEffect } from "react";
import { getCampaigns } from "../services/web3Service"; // This will call the blockchain
import CampaignCard from "../components/CampaignCard"; // Assuming you already have this component

const BrowseCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsFromBlockchain = await getCampaigns();
        setCampaigns(campaignsFromBlockchain);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">
          Browse Campaigns
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.length === 0 ? (
            <p>No campaigns available</p>
          ) : (
            campaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCampaigns;
