import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

function HeaderBar({image}) {
    return (
        <Navbar key={false} expand={false} className="mb-3">
            <Container fluid>
                <Image fluid className='logo text-white' src={image} alt="Cooking Image" />
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} className='bg-white' />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-false`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                    placement="end"
                    className='bg-white'
                >
                    <Offcanvas.Header closeButton>
                        <Image fluid className='logo' src='/easyprep2.png' alt="Cooking Image" />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="/home" className='text'>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/profile" className='text'>Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default HeaderBar