import { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import metamask from './assets/metamask-seeklogo.svg'

const Web3Context = createContext();

export default function App() {
  const [accounts, setAccounts] = useState('');
  const requestAccountAccess = async () => {
    try {
      // Request account access from MetaMask
      await window.ethereum.enable();

      // After approval, you can access the selected account through web3.eth.getAccounts()
      const accounts = await new Web3.eth.getAccounts();

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
          const web3 = new Web3(window.ethereum);
          // Request account access from MetaMask
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
          // Set web3 instance
        } else {
          alert('Install MetaMask extension');
        }
      } catch (error) {
        console.error(error);
      }
    };
    initializeWeb3();
  }, []);


  return (
    <>
      <Button className='border-0 btn-light' onClick={requestAccountAccess} id="metamaskBtn"><img src={metamask} alt="" /></Button>
      <Web3Context.Provider value={accounts}>
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

