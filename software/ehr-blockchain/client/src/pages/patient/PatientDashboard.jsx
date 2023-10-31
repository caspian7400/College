import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { MetamaskContext } from "../../App";
import axios from "axios";
export default function PatientDashboard() {
    const [patientData, setPatientData] = useState();
    const account = useContext(MetamaskContext);
    const navItems = [
        { name: "Dashboard", href: "/patient/dashboard", state: null },
        { name: "Files", href: "/patient/files", state: null }
    ]
    useEffect(() => {
        const getPatientData = async () => {
            const _patientData = await axios.get(`http://localhost:3000/getPatient/${account}`);
            console.log(_patientData);
            setPatientData(_patientData);
        }
        getPatientData();
    }, [account]);
    return (
        <>
            {patientData ? console.log(patientData) : null}
            <Header navItems={navItems} />
            <div id="content" className="p-4 p-md-5">
                <h2 className="mb-4">Content here</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.</p>
            </div>
        </>
    )
}
