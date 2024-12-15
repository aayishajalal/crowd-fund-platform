// src/pages/UserDashboardPage.js
import React from "react";
import UserDashboard from "../components/UserDashboard";
import { Link } from "react-router-dom";

const UserDashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 text-white bg-blue-600">
        <h2 className="mb-8 text-2xl font-bold">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">
                Overview
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">
                Campaigns
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">
                Settings
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">
                Profile
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back, User!
          </h1>
          <Link to="/create-campaign">
            <button className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-400">
              Create New Campaign
            </button>
          </Link>
        </header>

        {/* User Dashboard Component */}
        <UserDashboard />
      </main>
    </div>
  );
};

export default UserDashboardPage;
