import React, { useState, useEffect } from "react";
import web3 from "../services/web3Service";
import Crowdfunding from "../..//build/contracts/Crowdfunding.json";
import DonationChart from "../components/DonationChart";
import SocialShare from "../components/SocialShare";

const CrowdfundingPage = () => {
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Crowdfunding.networks[networkId];
      const instance = new web3.eth.Contract(
        Crowdfunding.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
    };
    init();
  }, []);

  const createCampaign = async (title, goal) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .createCampaign(title, web3.utils.toWei(goal, "ether"))
      .send({ from: accounts[0] });
  };

  const donate = async (campaignId, amount) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .donate(campaignId)
      .send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
  };

  const fetchCampaigns = async () => {
    const campaigns = await contract.methods.getCampaigns().call();
    setCampaigns(campaigns);
  };

  const fetchDonations = async (campaignId) => {
    const donations = await contract.methods.getDonations(campaignId).call();
    setDonationData(donations);
  };

  return (
    <div>
      <h1>Crowdfunding Platform</h1>
      <button onClick={fetchCampaigns}>Fetch Campaigns</button>
      {campaigns.map((campaign, index) => (
        <div key={index}>
          <h2>{campaign.title}</h2>
          <p>Goal: {web3.utils.fromWei(campaign.goal, "ether")} ETH</p>
          <p>
            Raised: {web3.utils.fromWei(campaign.raisedAmount, "ether")} ETH
          </p>
          <button onClick={() => donate(index, "0.1")}>Donate 0.1 ETH</button>
          <button onClick={() => fetchDonations(index)}>View Donations</button>
        </div>
      ))}

      <DonationChart data={donationData} />
      <SocialShare url="https://your-crowdfunding-site.com" />
    </div>
  );
};

export default CrowdfundingPage;
