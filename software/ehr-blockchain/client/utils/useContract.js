import Contract from "../src/contracts/Contract.json";
import { MetamaskContext } from "../src/App";
import { useEffect, useState, useContext } from "react";
import Web3 from "web3";

const useContract = () => {
    const [contract, setContract] = useState(null);
    const account = useContext(MetamaskContext);
    useEffect(() => {
        const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8546');
        const template = async () => {
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Contract.networks[networkId];
            const contract = new web3.eth.Contract(Contract.abi, deployedNetwork.address);
            setContract(contract);
        }
        provider && template();
    }, []);
    return {account, contract}
};

export default useContract;