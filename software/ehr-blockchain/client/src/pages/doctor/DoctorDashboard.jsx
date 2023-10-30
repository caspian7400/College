import { useEffect, useState } from "react";
import useContract from "../../../utils/useContract";
import Header from "../../components/Header";
import axios from "axios";

export default function DoctorDashboard() {
    const [doctorData, setDoctorData] = useState();
    const { account, contract } = useContract();
    useEffect(() => {
        if (!(contract && account)) return;
        const getDoctorData = async () => {
            const cidArray = await contract.methods.getPatientData(account).call({ from: account });
            const _doctorData = axios.post("http://localhost:3000/getDoctorData", { cidL: cidArray[0] });
            setDoctorData(_doctorData);
        }
        getDoctorData();
    }, [account, contract]);
    const navItems = [
        { name: "Dashboard", href: "/doctor/dashboard" },
        { name: "Patients", href: "/doctor/patients" }
    ]
    return (
        <>
            <Header navItems={navItems} />
            <div id="content" className="p-4 p-md-5">
                <h2 className="mb-4">Content here</h2>
                <p>{JSON.stringify(doctorData)}Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.</p>
            </div>
        </>

    )
}
