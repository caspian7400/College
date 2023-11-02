import { Form, FormLabel, FormControl, FormText, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import pill from '../assets/pill.jpeg'
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import axios from 'axios'
import useContract from '../../utils/useContract';

export default function Register() {
    const { account, contract } = useContract();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        DOB: '',
        aadhaar: '',
    });

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
        const isPatient = await checkPatient();
        if (isPatient) {
            console.log("patient already exists");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/createPatient", { ...formData, eth_addr: account });
            console.log(response);
            const receipt = await contract.methods.registerAsPatient().send({ from: account });
            console.log(receipt);
        } catch (error) {
            console.log(error);
        }
    }
    const test = async () => {
        try {
            // const testData = {
            //     name: "Frank",
            //     email: "frank@example.com",
            //     phoneNumber: "2223334444",
            //     DOB: "1993-09-12",
            //     aadhaar: "222333444412",
            //     eth_addr: account
            // }                       

            // const response = await axios.post("http://localhost:3000/createPatient", testData);
            // console.log(response);
            const receipt = await contract.methods.registerAsPatient().send({from: account});
            console.log(receipt);
        } catch (error) {
            console.log(error);
        }
    }
    const checkPatient = async () => {
        console.log(account);
        const isPatient = await contract.methods.isPatient().call({ from: account });
        return isPatient;
    }
    return (
        <Container className="signup-content" style={{ margin: '20px auto' }}>
            <div className="signup-htmlForm">
                <h2 className="htmlForm-title">Sign up</h2>
                <Form method="POST" className="register" id="register-htmlForm" onSubmit={handleSubmit}>
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
                            name="aadhaar"
                            value={formData.aadhaar}
                            onChange={handleChange}
                            placeholder="aadhaar number"
                        />
                    </div>
                    <div className='form-group'>
                        <FormControl style={{ paddingLeft: '25px' }} type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                        <FormText><span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of service</a></FormText>
                    </div>
                    <div className='form-group'>
                        <FormControl style={{ paddingLeft: '25px' }} type="submit" name="signup" id="signup" className="htmlForm-submit" value="Register" />
                    </div>
                </Form>
            </div>
            <div className="signup-image">
                <figure><img src={pill} alt="sing up image" style={{ height: '470.64px', width: '243px' }} /></figure>
                <Link to='/' className="signup-image-link">Already have an account?</Link>
            </div>
            <button className="btn btn-primary" onClick={test}>test</button>
        </Container>
    )
}
