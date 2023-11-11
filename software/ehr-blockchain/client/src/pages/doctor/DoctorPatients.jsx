import useContract from '../../../utils/useContract';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Modal, Form, FormControl } from 'react-bootstrap';
import { Web3Storage } from 'web3.storage';
import Patient from '../../components/Patient';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DoctorPatients() {
    const [patients, setPatients] = useState(null);
    const [patientEth, setPatientEth] = useState("");
    const [show, setShow] = useState(false);
    const { account, contract } = useContract();
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        setPatientEth(e.target.getAttribute("name"));
    };

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/doctor/get/${account}`);
                const patients = response.data.doctor.patients;
                const patientPromises = patients.map(async (item) => {
                    const response = await axios.get(`http://localhost:3000/patient/get/${item}`);
                    const dobDate = new Date(response.data.patient.dob);
                    const currentDate = new Date();
                    var age = currentDate.getUTCFullYear() - dobDate.getUTCFullYear();
                    if (
                        currentDate.getUTCMonth() < dobDate.getUTCMonth() ||
                        (currentDate.getUTCMonth() === dobDate.getUTCMonth() &&
                            currentDate.getUTCDate() < dobDate.getUTCDate())
                    ) {
                        age--;
                    }
                    return { eth_addr: response.data.patient.eth_addr, name: response.data.patient.name, age: age, email: response.data.patient.email };
                });
                const _patients = await Promise.all(patientPromises);
                setPatients(_patients);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }
        getPatients();
    }, [account]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(account);
        try {
            const response = await axios.get(`http://localhost:3000/token/get`);
            const client = new Web3Storage({ token: response.data.token });
            const fileInput = document.querySelector('input[type="file"]');
            const cid = await client.put(fileInput.files);
            const receipt = await contract.methods.addPatientFiles(patientEth, cid).send({ from: account, gas: 3000000 });
            if (receipt) {
                toast("file uploaded successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const update = await axios.patch(`http://localhost:3000/patient/addFile/${patientEth}`);
                console.log(update);
                console.log(receipt);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const navItems = [
        { name: "Dashboard", href: "/doctor/dashboard" },
        { name: "Patients", href: "/doctor/patients" }
    ];
    //TODO: add file button
    return (
        <>
            <ToastContainer />
            <Header navItems={navItems} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <FormControl type="file" accept=".pdf" />
                        </div>
                        <div className="from-group">
                            <FormControl style={{ paddingLeft: '25px' }} type="submit" name="upload" id="upload" className="htmlForm-submit" value="upload files" />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                !patients ?
                    <div>loading...</div>
                    :
                    <Container fluid className="d-flex flex-column">
                        {
                            patients.map((item, idx) => (
                                <Container key={idx} className="zoom d-flex my-2 p-3">
                                    <Patient patientDetails={item}>{item.name}</Patient>
                                    <Button onClick={handleShow} className="my-4 me-2 border-0 myBtn" name={item.eth_addr} ><i className="bi bi-plus-lg" name={item.eth_addr} /></Button>
                                </Container>
                            ))
                        }
                    </Container>
            }
        </>
    )
}
