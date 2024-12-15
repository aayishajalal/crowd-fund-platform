// src/components/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  const steps = [
    { title: 'Create Campaign', description: 'Set a goal, add details, and launch your campaign.' },
    { title: 'Receive Donations', description: 'Securely receive donations from backers worldwide.' },
    { title: 'Track Progress', description: 'Monitor your campaign performance in real-time.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="mb-10 text-4xl font-extrabold text-center">How It Works</h2>
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
