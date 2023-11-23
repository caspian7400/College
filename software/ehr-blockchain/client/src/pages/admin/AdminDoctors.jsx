import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormLabel, FormControl, Button, Container, Modal } from "react-bootstrap";
import Doctor from "../../components/Doctor";
import useContract from "../../../utils/useContract";
import Header from "../../components/Header";

export default function AdminDoctors() {
    const [doctors, setDoctors] = useState(null);
    const [addPatients, setAddPatients] = useState({ target: "", patients: [] });
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [formData, setFormData] = useState({
        eth_addr: '',
        name: '',
        specializations: '',
        email: '',
        phoneNumber: '',
        DOB: '',
        licenseNumber: '',
        aadhaar: '',
    });
    const { account, contract } = useContract();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);
    useEffect(() => {
        const getDoctors = async () => {
            const response = await axios.get("http://localhost:3000/doctor/get");
            if (response.data.doctors.length === 0) {
                setDoctors([]);
            }
            setDoctors(response.data.doctors);
        }
        getDoctors();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/doctor/create", formData);
        console.log(response.data);
    }

    const handleDel = async (event) => {
        const docAccount = event.target.getAttribute("eth_addr");
        console.log(docAccount);
        // delete from mongoDB
        const response = await axios.delete(`http://localhost:3000/doctor/delete/${docAccount}`);
        console.log(response.data);
        // delete from blockchain
        const receipt = await contract.methods.removeDoctor(docAccount).send({ from: account });
        console.log(receipt);
        // delete from DOM
        const updatedDcotors = doctors.filter((item) => item.eth_addr === docAccount);
        setDoctors(updatedDcotors);
    }

    const handleAdd = async (e) => {
        const docAddr = e.target.getAttribute("name")
        const doctor = doctors.find((item) => item.eth_addr == docAddr);
        const response = await axios.get("http://localhost:3000/patient/get");
        console.log(doctor);
        var _patients = response.data.patients;
        _patients = _patients.filter((item) => (doctor.patients.find((pat) => pat === item.eth_addr)) ? false : true);
        setAddPatients({ target: docAddr, patients: _patients });
        handleAddShow();
    }

    const addPatient = async (e) => {
        e.preventDefault();
        const addr = e.target.getAttribute("name");
        const response = await axios.patch(`http://localhost:3000/doctor/addPatient/${addPatients.target}`, { eth_addr: addr });
        console.log(response.data);
        const update = await axios.get("http://localhost:3000/doctor/get");
        setDoctors(update.data.doctors);
    }

    /************************* TEST **********************/
    // const testData =
    // {
    //     eth_addr: "0xbbB2Ccc53e33bBceAa058B69e1a803e66B2971EB",
    //     name: "Dr. yohan",
    //     specializations: ["Orthopedics", "Neurology"],
    //     email: "yohan@example.com",
    //     phoneNumber: "5551237890",
    //     DOB: "1970-02-10",
    //     licenseNumber: "MD67890",
    //     aadhaar: "555123789012"
    // }

    // const testDoc = async () => {
    //     const response = await axios.post("http://localhost:3000/doctor/create", testData);
    //     console.log(response.data);
    // }
    /****************************************************/
    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard" },
        { name: "Patients", href: "/admin/patients" },
        { name: "Doctors", href: "/admin/doctors" },
    ]
    return (
        //TODO: add-new/edit doctor button to be added
        <>
            <Header navItems={navItems} />
            {
                doctors === null ?
                    <Container className="loading" fluid></Container>
                    :
                    <Container fluid>
                        <div className="d-flex justify-content-end">
                            <Button onClick={handleShow} className="border-0 myBtn">add doctor</Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Doctor Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form method="POST" id="register-htmlForm" onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-person-fill "></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="text"
                                            name="eth_addr"
                                            value={formData.eth_addr}
                                            onChange={handleChange}
                                            placeholder="ethereum address"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-person-fill "></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-envelope-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="specs"
                                            name="specs"
                                            value={formData.specializations}
                                            onChange={handleChange}
                                            placeholder="specializations"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-envelope-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="date"
                                            name="DOB"
                                            value={formData.DOB}
                                            onChange={handleChange}
                                            placeholder="data of birth"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="text"
                                            name="license"
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                            placeholder="license number"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                                        <FormControl
                                            style={{ paddingLeft: '25px' }}
                                            type="text"
                                            name="aadhaar"
                                            value={formData.aadhaar}
                                            onChange={handleChange}
                                            placeholder="aadhaar number"
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <FormControl style={{ paddingLeft: '25px' }} type="submit" name="signup" id="signup" className="htmlForm-submit" value="Register" />
                                    </div>
                                </Form>
                                {/* <Button onClick={testDoc}>use test values</Button> */}
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={addShow} onHide={handleAddClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Patients</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    addPatients.patients.map((item, idx) =>
                                        <Container fluid key={idx} className="my-2">
                                            <Button className="myBtn-white" onClick={addPatient} name={item.eth_addr}>{item.name}</Button>
                                        </Container>
                                    )
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleAddClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleAddClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {
                            doctors.length === 0 ?
                                <div>no doctors found</div>
                                :
                                <Container fluid className="d-flex flex-column">
                                    {
                                        doctors.map((item) => (
                                            <Container key={item.eth_addr} className="zoom p-3 my-2 d-flex">
                                                <Doctor doctorDetails={item} />
                                                <Button onClick={handleAdd} name={item.eth_addr} className="border-0 myBtn"><i className="bi bi-plus-lg" name={item.eth_addr} /></Button>
                                                <Button onClick={handleDel} name={item.eth_addr} className="border-0 myBtn"><i className="bi bi-trash" name={item.eth_addr} /></Button>
                                            </Container>
                                        ))
                                    }
                                </Container>
                        }
                    </Container>
            }
        </>
    )
}