import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BrowseCampaigns from "./pages/BrowseCampaignsPage";
import CampaignForm from "./components/CampaignForm";
import CampaignDetails from "./components/CampaignDetails";
import ConnectWalletButton from "./components/ConnectWalletButton";
import RegisterPage from "./pages/RegisterPage"; // Added RegisterPage
import LoginPage from "./pages/LoginPage"; // Added LoginPage
import HomePage from "./pages/HomePage";
import Faq from "./components/Faq";
import UserDashboardPage from "./pages/UserDashboardPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ConnectWalletButton /> {/* Added the Connect Wallet Button here */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse-campaigns" element={<BrowseCampaigns />} />
            <Route path="/user-dashboard" element={<UserDashboardPage />} />
            <Route path="/create-campaign" element={<CampaignForm />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/register" element={<RegisterPage />} />{/* Register Route */}
            <Route path="/login" element={<LoginPage />} /> {/* Login Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
