import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Container, Modal, Form, FormControl } from "react-bootstrap";
import Patient from "../../components/Patient";
import useContract from "../../../utils/useContract";
import Header from "../../components/Header";
import { Web3Storage } from "web3.storage"

export default function AdminPatients() {
    const [patients, setPatients] = useState(null);
    const [show, setShow] = useState(false);
    const { account, contract } = useContract();
    const [patientEth, setPatientEth] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        setPatientEth(e.target.getAttribute("eth_addr"));
    };

    useEffect(() => {
        const getPatients = async () => {
            const response = await axios.get("http://localhost:3000/patient/get");
            console.log(response.data);
            setPatients(response.data.patients);
        }
        getPatients();
    }, []);
    const handleDel = async (event) => {
        const patientAcc = event.target.eth_addr;
        // remove from mongoDB
        const response = await axios.delete(`http://localhost:3000/patient/delete/${patientAcc}`);
        console.log(response.data);
        // remove from blockchain
        const receipt = await contract.methods.removePatient(patientAcc).send({ from: account });
        console.log(receipt);
        // remove from DOM
        const updatedPatients = patients.filter((item) => item.eth_addr === patientAcc);
        setPatients(updatedPatients);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`http://localhost:3000/token/get`);
        const client = new Web3Storage({ token: response.data.token });
        const fileInput = document.querySelector('input[type="file"]');
        const cid = await client.put(fileInput.files);
        console.log(typeof (cid));
        try {
            const receipt = await contract.methods.addPatientFiles(patientEth, cid).send({ from: account, gas: 3000000 });
            console.log(receipt);
        } catch (err) {
            console.log(err);
        }
    }
    const navItems = [
        { name: "Patients", href: "/admin/patients" },
        { name: "Doctors", href: "/admin/doctors" },
    ]
    return (
        <>
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
                patients === null ?
                    <Container>loading...</Container>
                    :
                    <Container fluid className="d-flex flex-column">
                        {
                            patients.map((item) => (
                                <Container key={item.eth_addr} className="zoom my-2 p-3">
                                    <Patient patientDetails={{ ...item, permitted: true }} />
                                    <Button onClick={handleDel} eth_addr={item.eth_addr} className="border-0 myBtn"><i className="bi bi-plus-lg" /></Button>
                                    <Button onClick={handleShow} eth_addr={item.eth_addr} className="border-0 myBtn"><i className="bi bi-trash" /></Button>
                                </Container>
                            ))
                        }
                    </Container>
            }
        </>
    )
}
