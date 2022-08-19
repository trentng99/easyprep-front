import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import HeaderBar from '../components/HeaderBar'
import { useAuth } from '../contexts/AuthContext'

function Profile({userdata}) {

    const { logout } = useAuth()
    const navigate = useNavigate()
    const directTo = (link) => {
        navigate(link)
    }

    return (
        <Container>
            <HeaderBar />
            <h1 className='py-3'>{userdata.name}'s Profile</h1>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={()=>directTo('saved-recipes')}>
                    Saved Recipes
                </Button>
                <Button type="submit" size="lg" className="btn btn-primary" onClick={logout}>
                    Log Out
                </Button>
            </div>
        </Container>
    )
}

export default Profile