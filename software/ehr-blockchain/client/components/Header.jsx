import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../../assets/img_avatar3.png";
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Image } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar key="lg" expand="lg" className=" bg-light-subtle mb-3">
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                            title
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-3">
                            <Nav.Link href="/patient/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/patient/files">Files</Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id="offcanvasNavbarDropdown-expand-lg"
                            >
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#action3" className="p-0">
                                <Image src={avatar} alt="" className="mx-1" style={{ width: "40px" }} fluid roundedCircle />
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
