import React, { useState } from "react";
import { loginUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Importing react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(user);
      // Assuming the response contains the token
      const token = response.data.token; // Adjust this according to your API response structure

      // Save token to localStorage
      localStorage.setItem("authToken", token);
      // Show success toast
      toast.success("Login successful!");
      navigate("/dashboard"); // Navigate to the dashboard after successful login
    } catch (error) {
      // Show error toast
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
