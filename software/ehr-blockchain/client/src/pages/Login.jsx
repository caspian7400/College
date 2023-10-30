import { Container } from 'react-bootstrap'
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useContract from '../../utils/useContract';

export default function Login() {
    const {account, contract} = useContract();
    const patientRef = useRef();
    const doctorRef = useRef();
    const adminRef = useRef();

    // const setAdmin = () => {
    //     contractState.methods.registerAsAdmin().send({ from: '0x2ab27b28bd19A908b420e44d1B131f2bEb1ea092' });
    // }
    const checkRole = (e) => {
        e.preventDefault();
        const link = e.currentTarget;
        const id = link.id;
        var isRole;
        if (id === 'patientLink') {
            isRole = new Promise((resolve, reject) => {
                contract.methods.isPatient().call({ from: account })
                    .then((res) => setTimeout(() => res ? resolve(true) : reject(false), 3000))
            });
        }
        if (id === 'doctorLink') {
            isRole = new Promise((resolve, reject) => {
                contract.methods.isDoctor().call({ from: account })
                    .then((res) => setTimeout(() => res ? resolve(true) : reject(false), 3000))
            })
        }
        if (id === 'adminLink') {
            isRole = new Promise((resolve, reject) => {
                contract.methods.isAdmin().call({ from: account })
                    .then((res) => setTimeout(() => res ? resolve(true) : reject(false), 3000))
            })
        }
        toast.promise(isRole, {
            pending: 'Checking accessibility',
            success: {
                render() {
                    setTimeout(() => window.location.href = link.href, 1800);
                    return 'Permitted'
                }
            },
            error: `Access Denied for ${account}`
        });


        /*************************** test functions ********************************/
    }
    const isPatient = async (e) => {
        e.preventDefault();
        const response = await contract.methods.isPatient().call({ from: account });
        console.log(response);
    }
    const isDoctor = async (e) => {
        e.preventDefault();
        const response = await contract.methods.isDoctor().call({ from: account });
        console.log(response);
    }
    const isAdmin = async (e) => {
        e.preventDefault();
        const response = await contract.methods.isAdmin().call({ from: account });
        console.log(response);
    }
    return (
        <Container className='card-deck d-flex justify-content-evenly'>
            <div className="card mb-4 shadow-sm">
                <Link ref={patientRef} id='patientLink' to='/patient/dashboard' className='text-decoration-none text-dark' onClick={checkRole}>
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Patient</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">Login as patient</h1>
                        {/* <ul className="list-unstyled mt-3 mb-4">
                        </ul> */}
                    </div>
                </Link>
            </div>
            <div className="card mb-4 shadow-sm">
                <Link ref={doctorRef} id='doctorLink' to='/doctor/dashboard' className='text-decoration-none text-dark' onClick={checkRole}>
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Doctor</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">Login as Doctor</h1>
                        {/* <ul className="list-unstyled mt-3 mb-4">
                        </ul> */}
                    </div>
                </Link>
            </div>
            <div className="card mb-4 shadow-sm">
                <Link ref={adminRef} id='adminLink' to='/admin/dashboard' className='text-decoration-none text-dark' onClick={checkRole}>
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Admin</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">Login as Admin</h1>
                        {/* <ul className="list-unstyled mt-3 mb-4">
                            <li>illimited users included</li>
                            <li>50 GB of storage</li>
                            <li>Phone and email support</li>
                            <li>Help center access</li>
                        </ul> */}
                    </div>
                </Link>
                <ToastContainer />
            </div>
            <button onClick={isPatient}>check patient</button>
            <button onClick={isAdmin}>check admin</button>
            <button onClick={isDoctor}>check doctor</button>
        </Container>
    )
}
