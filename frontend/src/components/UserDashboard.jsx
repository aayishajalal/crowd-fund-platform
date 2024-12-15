// src/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import CampaignCard from '../components/CampaignCard'; // Assuming we use CampaignCard to show user campaigns

const UserDashboard = () => {
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    // Fetch user's campaigns data from API or mock data
    const fetchUserCampaigns = async () => {
      // Replace with actual API call to fetch campaigns created by the user
      const data = [
        { title: 'My Campaign 1', description: 'Description of My Campaign 1', image: 'https://via.placeholder.com/300' },
        { title: 'My Campaign 2', description: 'Description of My Campaign 2', image: 'https://via.placeholder.com/300' },
      ];
      setUserCampaigns(data);
    };
    fetchUserCampaigns();
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">My Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userCampaigns.length === 0 ? (
            <p className="text-center text-lg text-gray-600">You haven't created any campaigns yet.</p>
          ) : (
            userCampaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
