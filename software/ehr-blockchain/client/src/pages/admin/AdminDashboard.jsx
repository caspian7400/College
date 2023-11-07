import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header";
import { MetamaskContext } from "../../App";
import axios from "axios";
import { Container } from "react-bootstrap";
import "../../css/styles.css";
export default function AdminDashboard() {
    const [patientCount, setPatientCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    const account = useContext(MetamaskContext);
    useEffect(() => {
        if (!account) return;
        const getPatientCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/patient");
            setPatientCount(response.data.count);
        };
        const getDoctorCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/doctor");
            setDoctorCount(response.data.count);
        };
        const getFileCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/file");
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
                    <Container fluid>
                        <div className="d-flex flex-column">
                            <div className="stat">Patient Count {patientCount}</div>
                            <div className="stat">Doctor Count {doctorCount}</div>
                            <div className="stat">File Count {fileCount}</div>
                        </div>
                    </Container>
                    :
                    <div>AdminDashboard</div>
            }
        </>
    )
}
