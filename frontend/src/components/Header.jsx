import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  const [user, setUser] = useState(null);

  // Check if there's a user logged in by fetching from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Here, you could decode the token to get the user details
      // Assuming you store the username in the localStorage or decode it from JWT token
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token (just an example)
      setUser(decodedToken.username || "User"); // Set the username (or a fallback value)
    }
  }, []);

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
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
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
              </>
            ) : (
              <div className="text-white">
                Welcome, {user} {/* Display the user's name */}
              </div>
            )}
          </div>
          <ConnectWalletButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
