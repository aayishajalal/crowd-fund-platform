// src/components/FeaturedCampaigns.jsx
import React from 'react';

const campaigns = [
  { id: 1, title: 'Save the Oceans', description: 'Help us clean and protect marine life.', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Support Education', description: 'Fund education for underprivileged children.', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Medical Relief', description: 'Provide essential medical aid to those in need.', image: 'https://via.placeholder.com/150' },
];

const FeaturedCampaigns = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="mb-10 text-4xl font-extrabold text-center">Featured Campaigns</h2>
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={campaign.image} alt={campaign.title} className="w-full mb-4 rounded-lg" />
            <h3 className="mb-2 text-2xl font-bold">{campaign.title}</h3>
            <p className="mb-4 text-gray-700">{campaign.description}</p>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Support Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
