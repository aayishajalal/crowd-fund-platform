// CampaignDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignById, donateToCampaign } from "../services/apiService"; // Assuming API calls are in apiService.js

const CampaignDetails = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null); // Store the campaign details
  const [loading, setLoading] = useState(true); // Track loading state
  const [donationAmount, setDonationAmount] = useState(""); // Track donation amount

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id); // Fetch campaign by ID
        setCampaign(response.data); // Set campaign data from API
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchCampaign();
  }, [id]);

  // Handle donation amount input
  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  // Handle "Donate Now" button click
  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (!token) {
      alert("You must be logged in to donate.");
      return;
    }

    const donationData = { amount: parseFloat(donationAmount) }; // Data to send to the API
    try {
      const response = await donateToCampaign(id, donationData, token); // Call the donate API
      alert("Thank you for your donation! 🎉");
      setDonationAmount(""); // Clear the input field
      setCampaign((prevCampaign) => ({
        ...prevCampaign,
        raisedAmount: prevCampaign.raisedAmount + parseFloat(donationAmount),
      })); // Update the raised amount dynamically
    } catch (error) {
      alert("Failed to process the donation. Please try again.");
      console.error("Donation Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        Campaign not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        {/* <div className="mb-6"> */}
        {/* Display campaign banner */}
        {/* <img
            src={campaign.image}
            alt="Campaign Banner"
            className="object-cover w-full h-64 rounded-lg"
          /> */}
        {/* </div> */}

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
        {/* <div className="mt-6">
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
        </div> */}

        {/* Donation Section */}
        <div className="mt-8">
          <input
            type="number"
            value={donationAmount}
            onChange={handleDonationChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter donation amount"
          />
          <button
            onClick={handleDonate}
            className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ethers } from "ethers"; // Ensure ethers.js is imported correctly
// import { getCampaignById } from "../services/apiService"; // Assuming API calls are in apiService.js

// const CampaignDetails = () => {
//   const { id } = useParams(); // Get the campaign ID from the URL
//   const [campaign, setCampaign] = useState(null); // Store the campaign details
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [donationAmount, setDonationAmount] = useState(""); // Track donation amount

//   useEffect(() => {
//     const fetchCampaign = async () => {
//       try {
//         const response = await getCampaignById(id); // Fetch campaign by ID
//         setCampaign(response.data); // Set campaign data from API
//       } catch (error) {
//         console.error("Failed to fetch campaign:", error);
//       } finally {
//         setLoading(false); // Set loading to false once the data is fetched
//       }
//     };

//     fetchCampaign();
//   }, [id]);

//   // Handle donation amount input
//   const handleDonationChange = (e) => {
//     setDonationAmount(e.target.value);
//   };

//   // Handle "Donate Now" button click

//   const handleDonate = async () => {
//     // Check if Ethereum is available (i.e., MetaMask or other Ethereum providers)
//     if (typeof window.ethereum === "undefined") {
//       alert(
//         "Ethereum provider (MetaMask) is not detected. Please install MetaMask."
//       );
//       return;
//     }

//     try {
//       // Initialize the provider using MetaMask's Ethereum provider (window.ethereum)
//       const provider = new ethers.providers.Web3Provider(window.ethereum); // Use window.ethereum to interact with MetaMask

//       // Request account access (this will prompt MetaMask to open and ask for account permission)
//       await provider.send("eth_requestAccounts", []);

//       const signer = provider.getSigner(); // Get the signer (the connected wallet)
//       const campaignAddress = campaign.address; // The address of the campaign from the API response

//       // Convert the donation amount to Wei (smallest unit of ETH)
//       const donationAmountInWei = ethers.utils.parseEther(
//         donationAmount.toString()
//       );

//       // Send the transaction (donate ETH to the campaign address)
//       const transaction = await signer.sendTransaction({
//         to: campaignAddress, // The campaign address to send donation
//         value: donationAmountInWei, // Donation value in Wei
//       });

//       // Wait for the transaction to be mined (confirmed)
//       await transaction.wait();

//       alert("Thank you for your donation! 🎉");

//       // Clear the donation amount input after successful donation
//       setDonationAmount("");

//       // Update the campaign raised amount dynamically after the donation
//       setCampaign((prevCampaign) => ({
//         ...prevCampaign,
//         raisedAmount: prevCampaign.raisedAmount + parseFloat(donationAmount),
//       }));
//     } catch (error) {
//       console.error("Donation Error:", error);
//       alert("Failed to process the donation. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!campaign) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         Campaign not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-10 bg-gray-100">
//       <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold">{campaign.title}</h2>
//         <p className="mt-4">{campaign.description}</p>

//         <div className="mt-6">
//           <h3 className="text-xl font-semibold">
//             Goal: ${campaign.goalAmount}
//           </h3>
//           <div className="flex items-center mt-4">
//             <div className="w-1/2 h-4 bg-gray-300 rounded-lg">
//               <div
//                 className="h-4 bg-green-500 rounded-lg"
//                 style={{
//                   width: `${
//                     (campaign.raisedAmount / campaign.goalAmount) * 100
//                   }%`,
//                 }}
//               ></div>
//             </div>
//             <span className="ml-4">
//               {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%
//               funded
//             </span>
//           </div>
//         </div>

//         <div className="mt-8">
//           <input
//             type="number"
//             value={donationAmount}
//             onChange={handleDonationChange}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             placeholder="Enter donation amount"
//           />
//           <button
//             onClick={handleDonate}
//             className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
//           >
//             Donate Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignDetails;
