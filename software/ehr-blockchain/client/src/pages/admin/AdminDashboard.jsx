import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header";
import { MetamaskContext } from "../../App";
import axios from "axios";
import { Container } from "react-bootstrap";
import "../../css/dashboard.css";
export default function AdminDashboard() {
    const [patientDetails, setPatientDetails] = useState({ count: 0, patients: [] });
    const [doctorDetails, setDoctorDetails] = useState({ count: 0, doctors: [] });
    const [fileCount, setFileCount] = useState(0);
    const account = useContext(MetamaskContext);
    useEffect(() => {
        if (!account) return;
        const getPatients = async () => {
            const response = await axios.get("http://localhost:3000/patient/get");
            setPatientDetails((prev) => ({ ...prev, patients: response.data.patients }));
        };
        const getPatientCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/patient");
            setPatientDetails((prev) => ({ ...prev, count: response.data.count }));
        };
        const getDoctors = async () => {
            const response = await axios.get("http://localhost:3000/doctor/get");
            setDoctorDetails((prev) => ({ ...prev, doctor: response.data.doctors }));
        }
        const getDoctorCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/doctor");
            setDoctorDetails((prev) => ({ ...prev, count: response.data.count }));
        };
        const getFileCount = async () => {
            const response = await axios.get("http://localhost:3000/count/get/file");
            if (response.data.count === undefined) return;
            setFileCount(response.data.count);
        };
        getPatients();
        getPatientCount();
        getDoctors();
        getDoctorCount();
        getFileCount();
    }, [account]);
    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard" },
        { name: "Patients", href: "/admin/patients" },
        { name: "Doctors", href: "/admin/doctors" },
    ]
    return (
        <>
            <Header navItems={navItems} />
            {
                (patientDetails || doctorDetails || fileCount) ?
                    <Container className="p-4 p-md-5">
                        {/* <Button onClick={addDoctor}>Add</Button> */}
                        {/* <Container fluid className="d-flex justify-content-between">
                        <Container className="stat p-4">
                            <h2>Patients</h2>
                            {
                                patientDetails.patients.map((item) => (<div key={item.eth_addr} className="zoom my-3 p-2" style={{ backgroundColor: "#427D9D", color: "white", borderRadius: "4px" }}>{item.name}</div>))
                            }
                        </Container>
                        <Container className="stat">
                            <h2>Doctors</h2>
                        </Container>
                        <Container className="stat">
                            <h2>Files</h2>
                        </Container>
                    </Container> */}
                        <h2 className="mb-4">Content here</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.</p>
                    </Container>
                    :
                    <div className="loader"></div>
            }
        </>
    )
}
