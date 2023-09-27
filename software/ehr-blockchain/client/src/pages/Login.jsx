import { Form, FormLabel, FormControl, FormText, Container, Button } from 'react-bootstrap'
import pill from '../assets/pill.jpeg'
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SimpleStorage from '../contracts/SimpleStorage.json'
import Test from '../contracts/Test.json'
import Web3 from 'web3';

export default function Login() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [testContract, setTestContract] = useState(null);

    useEffect(() => {
        const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
        const template = async () => {
            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorage.networks[networkId];
            const testDeployedNetwork = Test.networks[networkId];
            const testContract = new web3.eth.Contract(Test.abi, testDeployedNetwork.address);
            const contract = new web3.eth.Contract(SimpleStorage.abi, deployedNetwork.address);
            setContract(contract);
            setTestContract(testContract);
            setWeb3(web3);
        }
        provider && template();
    }, []);

    /****************************** TEST FUNCTIONS *********************/
    const readDataTest = async () => {
        const role = await testContract.methods.getRole();
        const name = await testContract.methods.getName();
        const email = await testContract.methods.getEmail();
        const password = await testContract.methods.getPassword();
        return { role, name, email, password };
    }
    /***************************************************************** */


    const readData = async () => {
        const data = await contract.methods.getter().call();
        return data;
    }
    const writeData = async (value) => {
        await contract.methods.setter(value).send({ from: '0xE894555068928f9d9f068EbeC07b90C606CB13fF' })
    }
    return (
        <Container className="signin-content">
            <div className="signin-image">
                <figure><img src={pill} alt="sign in image" style={{ width: '200px', height: '374px' }} /></figure>
                <Link to='/Register' className="signup-image-link">Create an account</Link>
            </div>
            <div className="signin-htmlForm">
                <h2 className="htmlForm-title">Login</h2>
                <Form method="POST" className="register-htmlForm" id="login-htmlForm">
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-person-fill"></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="text" name="your_name" id="your_name" placeholder="Your Name" />
                    </div>
                    <div className='form-group'>
                        <FormLabel style={{ marginLeft: '3px' }}><i className="bi bi-lock-fill"></i></FormLabel>
                        <FormControl style={{ paddingLeft: '25px' }} type="password" name="your_pass" id="your_pass" placeholder="Password" />
                    </div>
                    <div className='form-group'>
                        <FormControl style={{ paddingLeft: '25px' }} type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                        <FormText><span><span></span></span>Remember me</FormText>
                    </div>
                    <div className="htmlForm-group htmlForm-button">
                        <FormControl style={{ paddingLeft: '25px' }} type="submit" name="signin" id="signin" className="htmlForm-submit" value="Log in" />
                    </div>
                </Form>
            </div>
            <div>
                {
                    contract ?
                        (
                            <>
                                <h2 className='ms-5'>TEST</h2>
                                <div className='form-group ms-5'>
                                    <FormControl placeholder='enter a value' id='pog' className='mb-2' />
                                    <Button onClick={() => writeData(document.getElementById('pog').value)} className='mb-2'>set value</Button>
                                </div>
                                <div className='form-group ms-5'>
                                    <p id='output' />
                                    <Button onClick={async () => {
                                        document.getElementById('output').innerHTML = await readData()
                                    }}>get value</Button>
                                </div>
                            </>
                        ) :
                        null
                }

            </div>
        </Container>
    )
}
