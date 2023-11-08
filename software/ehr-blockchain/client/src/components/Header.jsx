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
    const textStyle = {
        color: "#e9f7ff",
    };
    return (
        <Navbar key="lg" expand="lg" className="mb-3 p-3" style={{ backgroundColor: "#164863" }}>
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
                                    <Nav.Link as={Link} to={item.href} state={{ prop: item.state ? item.state : null }} key={idx} className="navLink" style={textStyle}>
                                        {item.name}
                                    </Nav.Link>
                                )
                                )
                            }
                            <Nav.Link href="#action3" className="p-0">
                                <Image src={avatar} alt="" className="mx-1" style={{ width: "40px" }} fluid roundedCircle />
                            </Nav.Link>
                            {/* TODO: float logout to left */}
                            <div className="d-flex justify-content-end w-100">
                                <Nav.Link as={Link} to="/login" className="navLink-icon">
                                    <i className="bi bi-box-arrow-left" style={{ ...textStyle, paddingLeft: "2px" }} />
                                </Nav.Link>
                            </div>
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
