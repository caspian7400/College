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

export default function Register() {
    const [contract, setContract] = useState(null);
    const account = useContext(MetamaskContext);
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

    const myFun = async (e) => {
        e.preventDefault();
        const receipt = await contract.methods.registerAsPatient().send({ from: account });
        console.log(receipt);
    }

    const checkPatient = async () => {
        console.log(account);
        const isPatient = await contract.methods.isPatient().call({ from: account });
        console.log(isPatient);
        // if (isPatient) {
        //     console.log('is patient');
        // } else throw new Error('patient nahi hai');
    }
    return (
        <Container className="signup-content" style={{ margin: '20px auto' }}>
            <div className="signup-htmlForm">
                <h2 className="htmlForm-title">Sign up</h2>
                <Form method="POST" className="register" id="register-htmlForm">
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-person-fill "></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="text" name="name" id="name" placeholder="Your Name" />
                    </div>
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-envelope-fill"></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="email" name="email" id="email" placeholder="Your Email" />
                    </div>
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="password" name="pass" id="pass" placeholder="Password" />
                    </div>
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                    </div>
                    <div className='form-group'>
                        <FormControl style={{ paddingLeft: '25px' }} type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                        <FormText><span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of service</a></FormText>
                    </div>
                    <div className='form-group'>
                        <FormControl style={{ paddingLeft: '25px' }} type="submit" name="signup" id="signup" className="htmlForm-submit" value="Register" onSubmit={myFun} />
                    </div>
                </Form>
            </div>
            <div className="signup-image">
                <figure><img src={pill} alt="sing up image" style={{ height: '470.64px', width: '243px' }} /></figure>
                <Link to='/' className="signup-image-link">Already have an account?</Link>
            </div>
            <button onClick={myFun}>make patient</button>
            <button onClick={checkPatient}>am patient</button>
        </Container>
    )
}
