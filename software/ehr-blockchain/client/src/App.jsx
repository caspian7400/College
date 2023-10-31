import { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PatientFiles from "./pages/patient/PatientFiles";

export const MetamaskContext = createContext();

export default function App() {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    const setupWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const availableAccounts = await web3Instance.eth.getAccounts();
          setAccounts(availableAccounts);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Error while enabling Ethereum:', error);
        }
      } else {
        console.error('Make sure you have MetaMask or a compatible Ethereum wallet extension installed.');
      }
    };
    setupWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      const handleAccountsChanged = async () => {
        console.log('accounts changed');
        const availableAccounts = await web3.eth.getAccounts();
        setAccounts(availableAccounts);
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // Clean up the event listener when the component unmounts
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [web3, accounts]);
  return (
    accounts === null ? <div>loading</div>
      : (
        <>
          <MetamaskContext.Provider value={accounts[0]}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/files" element={<PatientFiles />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/patients" element={<DoctorDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MetamaskContext.Provider>
        </>
      )
  );
}

