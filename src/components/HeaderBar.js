import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

function HeaderBar() {
    return (
        <Navbar key={false} expand={false} className="mb-3">
            <Container fluid>
                <Image fluid className='logo text-white' src='/chef.png' alt="Cooking Image" />
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} className='bg-white' />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-false`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton className='bg-white'>
                        <Image fluid className='logo' src='/chef.png' alt="Cooking Image" />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                            activeKey="/home"
                        >
                            <Nav.Item>
                                <Nav.Link href="/home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default HeaderBar