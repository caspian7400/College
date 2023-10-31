import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap";
import Doctor from "../../components/Doctor";
import useContract from "../../../utils/useContract";

export default function AdminDoctors() {
    const [doctors, setDoctors] = useState(null);
    const { account, contract } = useContract();
    useEffect(() => {
        const getDoctors = async () => {
            const response = await axios.get("http://localhost:3000/getDoctors");
            setDoctors(response);
        }
        getDoctors();
    }, []);
    const handleDel = async (event) => {
        const docAccount = event.target.eth_addr;
        const response = await axios.delete(`http://localhost:3000/deleteDoctor/${docAccount}`);
        await contract.methods.removeDoctor(docAccount).send({ from: account });
        console.log(response.data);
        //TODO: remove corresponding container from DOM
    }
    return (
        //TODO: add-new/edit doctor button to be added
        <>
            {
                doctors ?
                    <Container>loading...</Container>
                    :
                    <Container fluid>
                        {
                            doctors.map((item) => (
                                <Container fluid key={item.eth_addr}>
                                    <Doctor doctorDetails={item} />
                                    <Button onClick={handleDel} eth_addr={item.eth_addr}>Delete</Button>
                                </Container>
                            ))
                        }
                    </Container>
            }
        </>
    )
}