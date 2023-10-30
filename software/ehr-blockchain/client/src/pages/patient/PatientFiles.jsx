//need cids of all the files associated with this account
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import File from "../../components/File";
import useContract from "../../../utils/useContract";

export default function PatientFiles() {
    const [fileDetails, setFileDetails] = useState(null);
    const { account, contract } = useContract();
    useEffect(() => {
        if (!(contract && account)) return;
        const getFiles = async () => {
            const cidArray = await contract.methods.getPatientFiles(account).call({ from: account });
            setFileDetails(cidArray);
        }
        if (contract)
            getFiles();
    }, [contract, account]);
    return (
        <>
            <Header />
            {
                !fileDetails ?
                    <div></div>
                    :
                    Array.from(fileDetails).map((item, idx) => {
                        <File key={idx} fileDetails={item}></File>
                    })
            }
        </>
    )
}
