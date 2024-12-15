// CampaignDetailsPage.jsx
import React from "react";

const CampaignDetails = ({ campaign }) => {
  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          {/* Display campaign banner */}
          <img
            src={campaign.image}
            alt="Campaign Banner"
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>

        {/* Display campaign title */}
        <h2 className="text-3xl font-bold">{campaign.title}</h2>

        {/* Display campaign description */}
        <p className="mt-4">{campaign.description}</p>

        {/* Goal and funding progress */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            Goal: ${campaign.goalAmount}
          </h3>
          <div className="flex items-center mt-4">
            <div className="w-1/2 h-4 bg-gray-300 rounded-lg">
              <div
                className="h-4 bg-green-500 rounded-lg"
                style={{
                  width: `${
                    (campaign.raisedAmount / campaign.goalAmount) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="ml-4">
              {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%
              funded
            </span>
          </div>
        </div>

        {/* Display milestones */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Milestones</h3>
          <ul>
            {campaign.milestones.map((milestone, index) => (
              <li key={index}>
                {milestone.name}: ${milestone.amount} -{" "}
                {Math.round((milestone.raised / milestone.amount) * 100)}%
                funded
              </li>
            ))}
          </ul>
        </div>

        {/* Donation Section */}
        <div className="mt-8">
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter donation amount"
          />
          <button className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
