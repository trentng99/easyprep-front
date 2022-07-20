import React from 'react'
import {Button} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'

function Home({user}) {

  const { logout } = useAuth()

  return (
    <div className='mb-2 App min-vh-100 d-flex justify-content-center align-items-center'>
      <h1 xs={12}>Welcome {user.email}</h1>
      <Button xs={12} variant="primary" size="lg" onClick={logout}>
        Sign Out
      </Button>
    </div>
  )
}

export default Home