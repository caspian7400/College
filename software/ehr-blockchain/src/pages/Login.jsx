import { Form, FormLabel, FormControl, FormText, Container } from 'react-bootstrap'
import pill from '../assets/pill.jpeg'
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

export default function Login() {
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
        </Container>
    )
}
