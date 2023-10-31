//need cids of all the files associated with this account
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import File from "../../components/File";
import useContract from "../../../utils/useContract";

export default function PatientFiles() {
    const [fileDetails, setFileDetails] = useState([]);
    const { account, contract } = useContract();
    const navItems = [
        { name: "Dashboard", href: "/patient/dashboard", state: null},
        { name: "Files", href: "/patient/files", state: null}
    ]
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
            <Header navItems={navItems} />
            {
                fileDetails.length === 0 ?
                    <div>NO FILES FOUND</div>
                    :
                    Array.from(fileDetails).map((item, idx) => {
                        <File key={idx} fileDetails={item}></File>
                    })
            }
        </>
    )
}
