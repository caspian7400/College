import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../assets/img_avatar3.png";
import PropTypes from "prop-types"
import { Navbar, Container, Offcanvas, Nav, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Header({ navItems }) {
    useEffect(() => {
        document.querySelectorAll(".navbar a").forEach((tab) => {
            if (tab.href === window.location.href) {
                tab.classList.add("active");
            }
        });
    }, []);
    return (
        <Navbar key="lg" expand="lg" className=" bg-dark-subtle mb-3">
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
                            {
                                navItems.map((item, idx) =>
                                (
                                    <Nav.Link as={Link} to={item.href} state={{ prop: item.state ? item.state : null }} key={idx}>
                                        {item.name}
                                    </Nav.Link>
                                )
                                )
                            }
                            <Nav.Link href="#action3" className="p-0">
                                <Image src={avatar} alt="" className="mx-1" style={{ width: "40px" }} fluid roundedCircle />
                            </Nav.Link>
                            {/* TODO: float logout to left */}
                            <Nav.Link as={Link} to="/login">
                                <i className="bi bi-box-arrow-left" />
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

Header.propTypes = {
    navItems: PropTypes.array.isRequired,
}
