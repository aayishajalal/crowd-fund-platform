// src/services/web3Service.js
import Web3 from 'web3';

let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  alert('Please install MetaMask');
}

export const getWeb3 = () => web3;

export const connectWallet = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return true;
  } catch (error) {
    console.error('User denied wallet connection');
    return false;
  }
}
