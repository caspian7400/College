import { Form, FormLabel, FormControl, FormText, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import pill from '../assets/pill.jpeg'
import Contract from '../contracts/Contract.json';
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { MetamaskContext } from '../App';
import axios from 'axios'

export default function Register() {
    const [contract, setContract] = useState(null);
    const account = useContext(MetamaskContext);
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        DOB: '',
        aadhaar: '',
    });
    useEffect(() => {
        const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8546');
        const template = async () => {
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Contract.networks[networkId];
            const contract = new web3.eth.Contract(Contract.abi, deployedNetwork.address);
            setContract(contract);
        }
        provider && template();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormdata({
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
            const response = await axios.post("http://localhost:3000/createPatient", formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        const receipt = await contract.methods.registerAsPatient().send({ from: account });
        console.log(receipt);
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
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="address"
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
        </Container>
    )
}
