// src/components/ConnectWalletButton.js
import React from "react";
import { connectWallet } from "../services/web3Service";

const ConnectWalletButton = () => {
  const handleClick = async () => {
    const connected = await connectWallet();
    if (connected) {
      alert("Wallet Connected");
    } else {
      alert("Wallet connection failed");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-700"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
