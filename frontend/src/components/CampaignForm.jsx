import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCampaign } from "../services/apiService"; // Adjust the import path based on your project structure

// Define the validation schema using Zod
const schema = z.object({
  title: z.string().min(1, "Campaign title is required"),
  description: z.string().min(1, "Description is required"),
  goalAmount: z
    .string()
    .min(1, "Goal amount is required") // Now it's a string, will convert to number later
    .transform((val) => parseFloat(val)) // Transform the string to number
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Goal amount must be a positive number",
    }),
  deadline: z.string().min(1, "Deadline is required"),
});

const CampaignForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      goalAmount: data.goalAmount,
      deadline: data.deadline,
    };

    try {
      const token = localStorage.getItem("authToken"); // Example of getting the token

      if (!token) {
        console.error("No token found. Please login first.");
        return;
      }
      // Call createCampaign from apiService
      const response = await createCampaign(payload, token);

      if (response.status === 201) {
        console.log("Campaign created:", response.data);
        // Optionally redirect or show success message
      } else {
        console.error("Error creating campaign:", response.data);
      }
    } catch (error) {
      // Handle error gracefully
      if (error.response) {
        console.error("Error creating campaign:", error.response.data);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center">
          Create a Campaign
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-700"
            >
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="goalAmount"
              className="block text-lg font-semibold text-gray-700"
            >
              Funding Goal
            </label>
            <input
              type="number"
              id="goalAmount"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("goalAmount")}
            />
            {errors.goalAmount && (
              <p className="text-sm text-red-500">
                {errors.goalAmount.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-lg font-semibold text-gray-700"
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("deadline")}
            />
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xl text-white bg-green-500 rounded-full hover:bg-green-600"
          >
            Submit Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
