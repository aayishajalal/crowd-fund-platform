// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-10 text-white bg-gray-900">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold">Crowdfund</h3>
          <p>Decentralized crowdfunding platform to support causes worldwide.</p>
        </div>
        <ul>
          <h3 className="mb-4 text-lg font-bold">Links</h3>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-campaign">Create Campaign</Link></li>
          <li><Link to="/browse-campaigns">Browse Campaigns</Link></li>
        </ul>
        <ul>
          <h3 className="mb-4 text-lg font-bold">Legal</h3>
          <li><Link to="/terms">Terms & Conditions</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
        <ul>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <li>Email: support@crowdfund.com</li>
          <li>Phone: +1 123 456 7890</li>
        </ul>
      </div>
      <div className="mt-10 text-center">
        <p>© 2024 Crowdfund. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
