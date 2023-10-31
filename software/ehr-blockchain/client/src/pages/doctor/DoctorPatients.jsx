import { useLocation } from 'react-router-dom';
import useContract from '../../../utils/useContract';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
// import { useState } from 'react';

export default function DoctorPatients() {
    const [patients, setPatients] = useState();
    const location = useLocation();
    const { prop } = location.state;
    useEffect(() => {
        if (!prop) return;
        var _patients = [];
        prop.patients.forEach(async (item) => {
            const response = await axios.get(`http://localhost:3000/getPatient/${item}`);
            _patients.push({ ethr_addr: response.body.ethr_addr, name: response.body.name, age: response.body.age, email: response.body.email })
        })
        setPatients(_patients);
    }, [prop]);
    const { account, contract } = useContract();
    console.log(account, contract);
    //TODO: add file button
    return (
        <Container fluid>
            {
                patients.map((item, idx) => {
                    <div key={idx}>{item.name}</div>
                })
            }
        </Container>
    )
}
