// import React, { useState } from "react";
// import { loginUser } from "../services/apiService";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify"; // Importing react-toastify
// import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

// const LoginPage = () => {
//   const [user, setUser] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser(user);
//       const token = response.data.token; // Check this field
//       localStorage.setItem("authToken", token);
//       toast.success("Login successful!");
//       navigate("/user-dashboard"); // Navigate after successful login
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="p-8 bg-white rounded-lg shadow-md w-96"
//       >
//         <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Login
//         </h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={user.email}
//           onChange={handleChange}
//           className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={user.password}
//           onChange={handleChange}
//           className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//         <button
//           type="submit"
//           className="w-full py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
//         >
//           Login
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { connectWallet } from "../services/web3Service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 - Aadhaar Input, 2 - OTP Verification, 3 - Connect Wallet
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // This is where the navigate function is defined

  /**
   * 🔹 Handle Aadhaar input change.
   */
  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 12) setAadhaar(value);
  };

  /**
   * 🔹 Validate Aadhaar and move to OTP step.
   */
  const handleAadhaarSubmit = () => {
    if (aadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    // Simulate sending OTP (for real implementation, use an API call)
    alert("OTP has been sent to your registered mobile number");
    setStep(2);
  };

  /**
   * 🔹 Handle OTP input change.
   */
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 6) setOtp(value);
  };

  /**
   * 🔹 Verify OTP and move to Connect Wallet step.
   */
  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    // Simulate OTP verification (for real implementation, use an API call)
    if (otp === "123456") {
      // Example: For testing, OTP is hardcoded as '123456'
      alert("OTP Verified Successfully");
      setStep(3);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  /**
   * 🔹 Connect to wallet and navigate to CampaignForm page.
   */
  const handleWalletConnect = async () => {
    setIsLoading(true);
    const connected = await connectWallet();
    setIsLoading(false);
    if (connected) {
      alert("Wallet Connected");
      navigate("/create-campaign"); // Navigate to CampaignForm page on successful wallet connection
    } else {
      alert("Wallet connection failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-10 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center">
              Enter Aadhaar Details
            </h2>
            <input
              type="text"
              placeholder="Enter your 12-digit Aadhaar"
              value={aadhaar}
              onChange={handleAadhaarChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAadhaarSubmit}
              className="w-full px-6 py-3 text-white transition-all bg-green-500 rounded-md hover:bg-green-700"
            >
              Submit Aadhaar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center">Enter OTP</h2>
            <p className="mb-4 text-sm text-center text-gray-600">
              We have sent an OTP to your registered mobile number.
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full px-6 py-3 text-white transition-all bg-green-500 rounded-md hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center">
              Connect Your Wallet
            </h2>
            <p className="mb-4 text-sm text-center text-gray-600">
              Please connect your MetaMask wallet to proceed.
            </p>
            <button
              onClick={handleWalletConnect}
              className={`w-full bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all ${
                isLoading && "opacity-50 pointer-events-none"
              }`}
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
