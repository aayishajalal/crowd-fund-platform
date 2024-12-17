import Web3 from "web3";
import CrowdfundingABI from "../../../Smart_Contract_Creation/build/contracts/Crowdfunding.json";

let web3Instance = null;
let contractInstance = null;
let userAccount = null;

/**
 * Function to connect to MetaMask and initialize web3.
 */
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3Instance = new Web3(window.ethereum);
      const accounts = await web3Instance.eth.getAccounts();
      userAccount = accounts[0];

      if (!userAccount) throw new Error("No account found. Please connect to MetaMask.");

      console.log("Connected account:", userAccount);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      await initContract(); // Initialize the contract after connecting to MetaMask
      return userAccount;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  } else {
    alert("Please install MetaMask to use this dApp.");
  }
};

/**
 * Handle account changes in MetaMask.
 */
const handleAccountsChanged = async (accounts) => {
  if (accounts.length === 0) {
    alert("Please connect to MetaMask.");
  } else {
    userAccount = accounts[0];
    await initContract();
  }
};

/**
 * Handle network changes.
 */
const handleChainChanged = () => {
  alert("Network changed. Please reload the page.");
  window.location.reload();
};

/**
 * Initialize web3 instance.
 */
export const initializeWeb3 = async () => {
  if (!web3Instance) {
    await connectWallet();
  }
  return web3Instance;
};

/**
 * Initialize contract instance.
 */
export const initContract = async () => {
  if (!web3Instance) {
    console.error("Web3 is not initialized. Please connect your wallet.");
    return;
  }

  const networkId = await web3Instance.eth.net.getId();
  const deployedNetwork = CrowdfundingABI.networks[networkId];

  if (deployedNetwork) {
    contractInstance = new web3Instance.eth.Contract(CrowdfundingABI.abi, deployedNetwork.address);
    console.log("Contract instance initialized:", contractInstance);
  } else {
    alert("Smart contract not found on this network. Please switch the network.");
  }
};

/**
 * Create a campaign on the blockchain.
 */
export const createCampaignOnBlockchain = async (payload) => {
  if (!contractInstance || !userAccount) {
    alert("Web3 or Contract is not initialized.");
    return { success: false, message: "Web3 or Contract is not initialized." };
  }

  try {
    console.log("Sending payload to blockchain: ", payload); // ✅ Log payload to debug
    const result = await contractInstance.methods
      .createCampaign(payload.title, payload.description, payload.goal, payload.deadline, payload.milestoneAmount)
      .send({ from: userAccount });

    console.log("Campaign created successfully:", result);
    return { success: true, message: "Campaign created successfully." };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { success: false, message: error.message };
  }
};
