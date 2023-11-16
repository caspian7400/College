// import { useState, useEffect } from "react";
// import Contract from "./contracts/Contract.json";
// import Web3 from "web3";
import { Container } from "react-bootstrap";
import "./css/dashboard.css";

export default function Test() {
    // const [contractState, setContractState] = useState(null);
    // useEffect(() => {
    //     const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8546');
    //     const setupWeb3 = async () => {
    //         const web3Instance = new Web3(provider);
    //         const networkId = await web3Instance.eth.net.getId();
    //         const deployedNetwork = Contract.networks[networkId];
    //         const contractInstance = new web3Instance.eth.Contract(Contract.abi, deployedNetwork.address);
    //         setContractState(contractInstance);
    //     }
    //     provider && setupWeb3();
    // }, []);
    // const addFiles = async () => {
    //     const response = await contractState.methods.addPatientFiles("0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26","bafybeig72n3r5jvcamhkqnupr2x7buks6lt4ebqjirp43yhmcyhcrfvegy").send({ from: "0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26", gas: "3000000" });
    //     console.log(response);
    // }
    // const getFiles = async () => {
    //     const response = await contractState.methods.getPatientFiles("0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26").call({ from: "0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26" });
    //     console.log(response);
    // }
    // const makePatient = async () => {
    //     const response = await contractState.methods.registerAsPatient().send({ from: "0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26" });
    //     console.log(response);
    // }

    // const isPatient = async () => {
    //     const response = await contractState.methods.isPatient().call({ from: "0x52fFdb87ab3cC2e404458f351226D00D5EDfDA26" });
    //     console.log(response);
    // }
    return (
        <Container className="loader" fluid>
            {/* <button onClick={makePatient}>register as patient</button>
            <button onClick={isPatient}>is patient</button>
            <button onClick={addFiles}>add files</button>
            <button onClick={getFiles}>get files</button> */}
        </Container>
    )
}
