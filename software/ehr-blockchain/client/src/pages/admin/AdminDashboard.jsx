import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header";
import { MetamaskContext } from "../../App";
import axios from "axios";
export default function AdminDashboard() {
    const [patientCount, setPatientCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    const account = useContext(MetamaskContext);
    useEffect(() => {
        if (!account) return;
        const getPatientCount = async () => {
            const response = await axios.get("http://localhost:3000/getCount/patient");
            setPatientCount(response.data.count);
        };
        const getDoctorCount = async () => {
            const response = await axios.get("http://localhost:3000/getCount/doctor");
            setDoctorCount(response.data.count);
        };
        const getFileCount = async () => {
            const response = await axios.get("http://localhost:3000/getCount/file");
            if (response.data.count === undefined) return;
            setFileCount(response.data.count);
        };
        getPatientCount();
        getDoctorCount();
        getFileCount();
    }, [account]);
    const navItems = [
        { name: "Patients", href: "/admin/patients" },
        { name: "Doctors", href: "/admin/doctors" },
    ]
    return (
        <>
            <Header navItems={navItems} />
            {
                (patientCount || doctorCount || fileCount) ?
                    <div>
                        {patientCount}
                        {doctorCount}
                        {fileCount}
                    </div>
                    :
                    <div>AdminDashboard</div>
            }
        </>
    )
}
