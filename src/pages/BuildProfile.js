import React from 'react'
import Container from 'react-bootstrap/Container';

function BuildProfile({user}) {

    
  return (
    <Container className='min-vh-100 d-flex justify-content-center align-items-center'>
        <h1>Do you have any allergies or food you are abstaining from?</h1>
        {user.email}
    </Container>
  )
}

export default BuildProfile