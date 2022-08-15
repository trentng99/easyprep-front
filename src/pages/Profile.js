import React from 'react'
import { Container } from 'react-bootstrap'
import HeaderBar from '../components/HeaderBar'
import { useAuth } from '../contexts/AuthContext'

function Profile() {

    const { logout } = useAuth()

    return (
        <Container>
            <HeaderBar />
            Profile
            <button type="submit" className="btn btn-primary" onClick={logout}>
            Log Out
          </button>
        </Container>
    )
}

export default Profile