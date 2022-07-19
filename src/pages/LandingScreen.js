import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'

function LandingScreen() {
  return (
    <Container className='min-vh-100 d-flex'>
      {/* Logo */}
      <Stack gap={4}>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} sm={{ span: 2, offset: 0 }}>
            <Image fluid src='/facebook.svg' alt="Cooking Image" />
          </Col>
        </Row>
          <Row className='d-flex align-items-center'>
            {/* Image */}
            <Col sm={6}>
              <Image fluid src='/cooking.svg' alt="Cooking Image" />
            </Col>
            {/* Text and buttons */}
            <Col sm={6} className='text-center py-5'>
              Right
            </Col>
          </Row>
      </Stack>
    </Container>
  )
}

export default LandingScreen