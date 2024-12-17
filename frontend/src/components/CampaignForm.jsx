import React, { useState } from "react";
import { createCampaign } from "../services/apiService"; // Backend API call
import {
  initializeWeb3,
  createCampaignOnBlockchain,
} from "../services/web3Service"; // Web3 interactions
import { useNavigate } from "react-router-dom"; // For redirecting after successful submission
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toast notifications
import { z } from "zod"; // Import Zod

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: 0,
    deadline: "",
    milestoneAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate from react-router-dom v6

  // Initialize toast notifications
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  // Define Zod validation schema
  const campaignSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    goal: z
      .number()
      .min(1, "Goal must be greater than 0.")
      .refine((value) => value > 0, "Goal must be greater than 0."),
    deadline: z.string().refine((value) => {
      return new Date(value) > new Date();
    }, "Deadline must be a future date."),
    milestoneAmount: z
      .number()
      .min(1, "Milestone Amount must be greater than 0.")
      .refine((value) => value > 0, "Milestone Amount must be greater than 0."),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = campaignSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      notifyError(result.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);
      setError(""); // Clear any previous errors

      // Convert the date (yyyy-MM-dd) to UNIX timestamp
      const deadlineTimestamp = Math.floor(
        new Date(formData.deadline).getTime() / 1000
      );

      const payload = {
        ...formData,
        goalAmount: parseFloat(formData.goal),
        milestoneAmount: parseFloat(formData.milestoneAmount),
        deadline: deadlineTimestamp,
      };

      // 1. Initialize Web3 and create campaign on the blockchain
      await initializeWeb3();
      const blockchainResponse = await createCampaignOnBlockchain(payload);

      console.log("Blockchain Response:", blockchainResponse);

      // Handle blockchain response being invalid
      if (!blockchainResponse || !blockchainResponse.success) {
        setError("Failed to create campaign on blockchain.");
        notifyError("Failed to create campaign on blockchain.");
        setLoading(false);
        return;
      }

      // 2. Get the token (for authenticated user)
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You must be logged in to create a campaign.");
        notifyError("You must be logged in to create a campaign.");
        setLoading(false);
        return;
      }

      // Log the backendPayload before sending it to the backend
      console.log("Sending backend payload:", payload);

      // Call the backend API to store the campaign in the database
      const response = await createCampaign(payload, token);

      if (response.status === 201) {
        notifySuccess("Campaign created successfully!");
        // Clear the form data after successful submission
        setFormData({
          title: "",
          description: "",
          goal: 0,
          deadline: "",
          milestoneAmount: 0,
        });
        navigate("/browse-campaigns"); // Redirect to the campaigns page
      } else {
        setError(response.data.message || "Failed to create campaign.");
        notifyError(response.data.message || "Failed to create campaign.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
      notifyError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/3">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Create a Campaign
        </h1>

        {/* Show error message if any */}
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter campaign title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe your campaign"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Goal Input */}
          <div>
            <label
              htmlFor="goal"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Goal (in Wei)
            </label>
            <input
              type="number"
              name="goal"
              id="goal"
              placeholder="Enter goal amount"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deadline Input */}
          <div>
            <label
              htmlFor="deadline"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Milestone Amount Input */}
          <div>
            <label
              htmlFor="milestoneAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Milestone Amount
            </label>
            <input
              type="number"
              name="milestoneAmount"
              id="milestoneAmount"
              placeholder="Enter milestone amount"
              value={formData.milestoneAmount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-bold text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Creating Campaign..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
