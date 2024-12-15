import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { getAllCampaigns } from '../services/apiService';

const BrowseCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getAllCampaigns();  // Fetch all campaigns from the API
        setCampaigns(response.data);  // Set campaigns state with the response data
      } catch (error) {
        setError("Failed to load campaigns.");  // Handle API call errors
      } finally {
        setLoading(false);  // Stop loading once the data is fetched or an error occurs
      }
    };

    fetchCampaigns();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-800">Loading campaigns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Browse Campaigns
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-bold text-indigo-600">
              {campaign.title}
            </h2>
            <p className="mb-4 text-gray-600">
              {campaign.description}
            </p>
            <p className="font-semibold text-gray-800">
              Goal: <span className="text-green-600">${campaign.goalAmount}</span>
            </p>
            <p className="font-semibold text-gray-800">
              Raised: <span className="text-blue-600">${campaign.raisedAmount}</span>
            </p>

            {/* Link to the CampaignDetails page */}
            <Link 
              to={`/campaigns/${campaign.id}`}  // Replace with the actual route to your campaign details page
              className="block w-full py-2 mt-4 text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              View Campaign
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCampaignsPage;
