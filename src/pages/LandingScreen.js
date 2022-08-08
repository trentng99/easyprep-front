import React from 'react'
import Container from 'react-bootstrap/Container';
import {Row, Col, Image, Stack, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

function LandingScreen({user}) {
  const navigate = useNavigate()

  if(user) {
    navigate('/home')
  }

  return (
    <Container className='d-flex'>
      {/* Logo */}
      <Stack gap={4}>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} sm={{ span: 2, offset: 0 }}>
            <Image fluid src='/facebook.svg' alt="Cooking Image" />
          </Col>
        </Row>
        <Row className='my-4 d-flex align-items-center'>
          {/* Image */}
          <Col sm={6} className="p-4">
            <Image fluid src='/cooking.svg' alt="Cooking Image" />
          </Col>
          {/* Text and buttons */}
          <Col sm={6} className='text-center p-4 d-grid gap-2'>
            <h1 class="font-weight-bold">Say goodbye to endless scrolling for recipes</h1>
            <p class="text-body">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <Button variant="primary" size="lg" href='/signup'>
              Sign Up For An Account
            </Button>
            <div className="text-center mt-3">
              Have an account?{" "}
              <a className="link-primary" href='/login'>
                Log In
              </a>
            </div>
          </Col>
        </Row>
      </Stack>
    </Container>
  )
}

export default LandingScreen