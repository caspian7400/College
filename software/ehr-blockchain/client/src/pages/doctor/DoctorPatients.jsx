import { useLocation } from 'react-router-dom';
import useContract from '../../../utils/useContract';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Modal, Form, FormControl } from 'react-bootstrap';
import { Web3Storage } from 'web3.storage';
import Patient from '../../components/Patient';
import Header from '../../components/Header';

export default function DoctorPatients() {
    const [patients, setPatients] = useState();
    const [patientEth, setPatientEth] = useState("");
    const [show, setShow] = useState(false);
    const { account, contract } = useContract();
    const location = useLocation();
    const { prop } = location.state;
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        setPatientEth(e.target.getAttribute("eth_addr"));
    };

    useEffect(() => {
        var _patients = [];
        console.log(prop)
        prop.forEach(async (item) => {
            const response = await axios.get(`http://localhost:3000/patient/get/${item}`);
            console.log(response.data);
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
            _patients.push({ eth_addr: response.data.patient.eth_addr, name: response.data.patient.name, age: age, email: response.data.patient.email })
        })
        setPatients(_patients);
    }, [prop]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/token/get`);
            const client = new Web3Storage({ token: response.data.token });
            const fileInput = document.querySelector('input[type="file"]');
            const cid = await client.put(fileInput.files);
            const receipt = await contract.methods.addPatientFiles(patientEth, cid).send({ from: account, gas: 3000000 });
            const update = await axios.patch(`http://localhost:3000/patient/addFile/${patientEth}`);
            console.log(update);
            console.log(receipt);
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
                    <Container fluid>
                        {
                            patients.map((item, idx) => (
                                <div key={idx} className="d-flex">
                                    <Patient patientDetails={item}>{item.name}</Patient>
                                    <Button onClick={handleShow} className="my-4 me-2" eth_addr={`${item.eth_addr}`}>add</Button>
                                </div>
                            ))
                        }
                    </Container>
            }
        </>
    )
}
