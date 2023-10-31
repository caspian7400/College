import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap";
import Patient from "../../components/Patient";
import useContract from "../../../utils/useContract";

export default function AdminPatients() {
    const [patients, setPatients] = useState(null);
    const { account, contract } = useContract();
    useEffect(() => {
        const getPatients = async () => {
            const response = await axios.get("http://localhost:3000/getPatients");
            setPatients(response);
        }
        getPatients();
    }, []);
    const handleDel = async (event) => {
        const patientAcc = event.target.eth_addr;
        const response = await axios.delete(`http://localhost:3000/deletePatient/${patientAcc}`);
        await contract.methods.removePatient(patientAcc).send({ from: account });
        console.log(response);
        //TODO: remove corresponding container from DOM
    }

    const handleAdd = async (event) => {
        const patientAcc = event.target.eth_addr;
        //TODO: add-file form thing
        const response = await axios.post("http://localhost:3000/uploadRecord");
        await contract.methods.addPatientFiles(patientAcc, response.data.cid).send({ from: account });
        console.log(response.data)
    }
    return (
        //TODO: add-new/edit patient button to be added
        <>
            {
                patients ?
                    <Container>loading...</Container>
                    :
                    <Container fluid>
                        {
                            patients.map((item) => (
                                <Container key={item.eth_addr}>
                                    <Patient patientDetails={item} />
                                    <Button onClick={handleDel} eth_addr={item.eth_addr}>Delete</Button>
                                    <Button onClick={handleAdd} eth_addr={item.eth_addr}>Add</Button>
                                </Container>
                            ))
                        }
                    </Container>
            }
        </>
    )
}
