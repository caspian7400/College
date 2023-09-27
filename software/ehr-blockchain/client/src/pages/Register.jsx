import { Form, FormLabel, FormControl, FormText, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import medicine from '../assets/medicine.jpeg'
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
    return (
        <Container className="signup-content">
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
                        <FormControl style={{ paddingLeft: '25px' }} type="submit" name="signup" id="signup" className="htmlForm-submit" value="Register" />
                    </div>
                </Form>
            </div>
            <div className="signup-image">
                <figure><img src={medicine} alt="sing up image" style={{ height: '533.64px', width: '300px' }} /></figure>
                <Link to='/' className="signup-image-link">Already have an account?</Link>
            </div>
        </Container>
    )
}
