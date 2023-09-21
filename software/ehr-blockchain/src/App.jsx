import { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const Web3Context = createContext();

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState('');

  const requestAccountAccess = async () => {
    try {
      // Request account access from MetaMask
      await window.ethereum.enable();

      // After approval, you can access the selected account through web3.eth.getAccounts()
      const accounts = await web3.eth.getAccounts();

      // Update your component state or perhtmlForm actions with the selected account
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Define a function to initialize web3
    const initializeWeb3 = async () => {
      try {
        if (window.ethereum) {
          const newWeb3 = new Web3(window.ethereum);

          // Request account access from MetaMask
          await window.ethereum.enable();

          // Set web3 instance
          setWeb3(newWeb3);
        } else {
          alert('Install MetaMask extension');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the initialization function
    initializeWeb3();
  }, []);

  // Use a separate effect to get accounts when web3 changes
  useEffect(() => {
    if (web3) {
      const fetchAccounts = async () => {
        try {
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAccounts();
    }
  }, [web3]);

  return (
    <>
      <Button className='btn-success border-0' onClick={requestAccountAccess} id="metamaskBtn">Connect MetaMask</Button>
      <Web3Context.Provider value={{ web3, accounts }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Web3Context.Provider>
    </>
  );
}

