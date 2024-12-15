import React from 'react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  return (
    <header className="text-white bg-gray-900">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Crowdfund</h1>
          <ul className="flex space-x-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-campaign">Create Campaign</Link></li>
            <li><Link to="/browse-campaigns">Browse Campaigns</Link></li>
            <li><Link to="/user-dashboard">My Contributions</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                Register
              </button>
            </Link>
          </div>
          <ConnectWalletButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
