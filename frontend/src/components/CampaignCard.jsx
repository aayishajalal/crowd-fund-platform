// src/components/CampaignCard.jsx
import React from 'react';

const CampaignCard = ({ campaign }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      {/* Display campaign title */}
      <h3 className="mb-2 text-xl font-semibold">{campaign.title}</h3>

      {/* Display campaign description */}
      <p className="mb-4 text-gray-600">{campaign.description}</p>

      {/* Display funding goal and raised amount */}
      <div className="flex justify-between mb-4">
        <p className="text-sm font-semibold text-gray-800">
          Goal: <span className="text-green-600">${campaign.goalAmount}</span>
        </p>
        <p className="text-sm font-semibold text-gray-800">
          Raised: <span className="text-blue-600">${campaign.raisedAmount}</span>
        </p>
      </div>

      {/* Button to donate or view campaign */}
      <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
        View Campaign
      </button>
    </div>
  );
};

export default CampaignCard;
