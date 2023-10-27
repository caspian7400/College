//need cids of all the files associated with this account
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import File from "../../components/File";
import Contract from "../../contracts/Contract.json";
import { MetamaskContext } from "../../App";
import Web3 from "web3";
import axios from "axios";

export default function PatientFiles() {
    const [fileDetails, setFileDetails] = useState({
        cid: "",
        name: ""
    });
    const [contractState, setContractState] = useState(null);
    const account = useContext(MetamaskContext);
    useEffect(() => {
        const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8546');
        const setupWeb3 = async () => {
            const web3Instance = new Web3(provider);
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = Contract.networks[networkId];
            const contractInstance = new web3Instance.eth.Contract(Contract.abi, deployedNetwork.address);
            setContractState(contractInstance);
        }
        provider && setupWeb3();
    }, []);
    useEffect(() => {
        const getFiles = async () => {
            const cidArray = await contractState.methods.getPatientFiles(account).call({ from: `${account}` });
            const _fileDetails = await axios.post("http:localhost:3000", { cidArray });
            console.log(_fileDetails);
            setFileDetails(_fileDetails);
        }
        if (contractState)
            getFiles();
    }, [contractState, account]);
    return (
        <>
            <Header />
            {
                fileDetails.map((item, idx) => {
                    <File key={idx} fileDetails={item}></File>
                })
            }
        </>
    )
}
