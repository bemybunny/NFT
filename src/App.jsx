import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import ModelUploader from './ModelUploader';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const onConnect = async () => {
    console.log('hey');
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let balance = await web3.eth.getBalance(account);
        setEthBalance(Web3.utils.fromWei(balance, 'ether'));
        setIsConnected(true);
      } else {
        console.log("Please install MetaMask!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">React dApp Authentication</h1>
        <div>
          {!isConnected ? (
            <button
              onClick={onConnect}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <button
              onClick={onDisconnect}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Disconnect
            </button>
          )}
        </div>
        {isConnected && (
          <div className="mt-4">
            <p className="text-gray-700">Balance: {ethBalance} ETH</p>
            <ModelUploader  />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
