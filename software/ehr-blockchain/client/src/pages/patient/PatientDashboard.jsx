import Header from "../../components/Header";
import useContract from "../../../utils/useContract";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PatientDashboard() {
    const [patientData, setPatientData] = useState();
    const { account, contract } = useContract();
    const navItems = [
        { name: "Dashboard", href: "/patient/dashboard" },
        { name: "Files", href: "/patient/files" }
    ]
    useEffect(() => {
        if (!(contract && account)) return;
        const getPatientData = async () => {
            const cidArray = await contract.methods.getPatientFiles(account).call({ from: account });
            const _patientData = await axios.post("http://localhost:3000/getPatientData", { cid: cidArray[0] });
            // TODO: make getPatientData endpoint
            setPatientData(_patientData);
        }
        getPatientData();
    }, [account, contract]);
    return (
        <>
            <Header navItems={navItems} />
            <div id="content" className="p-4 p-md-5">
                <h2 className="mb-4">Content here</h2>
                <p>{JSON.stringify(patientData)}Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.</p>
            </div>
        </>
    )
}
