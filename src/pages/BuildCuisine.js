import React from 'react'
import cuisineList from '../data/cuisineList';
import { ToggleButtonGroup, Container, ToggleButton, Stack } from 'react-bootstrap';
import { db } from '../firebase-config';
import {doc,updateDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

function BuildProfile({ user, state, setState }) {
    let newArray
    let userCollectionRef
    const navigate = useNavigate();

    //Reference to users collection in firebase db
    if (user.email) {
        userCollectionRef = doc(db, "users", user.email)
    }

    const handleCheckboxChange = event => {
        newArray = [...state.cuisines, event.target.id];
        if (state.cuisines.includes(event.target.id)) {
            newArray = newArray.filter(cuisine => cuisine !== event.target.id);
        }
        setState({
            ...state,
            cuisines: newArray
        })
    };

    //Function to update data in database
    const updateUser = async () => {
        console.log(state.cuisines)
        await updateDoc(userCollectionRef, {
            cuisines: state.cuisines
        });
        navigate('/home')
    }

    //Return all the allergies for user to choose
    const listOfAllergies = cuisineList.map(
        (cuisine) => <ToggleButton id={cuisine.value} key={cuisine.value} value={cuisine.value} variant='outline-primary' 
        onChange={handleCheckboxChange}>{cuisine.value}</ToggleButton>
    )

    return (
        <Container >
            <Stack gap={3} className='min-vh-100 d-flex justify-content-center align-items-center'>
                <h1>What are your preferred cuisines?</h1>
                <ToggleButtonGroup vertical type="checkbox" className="mb-2">
                    {listOfAllergies}
                </ToggleButtonGroup>
                <button onClick={updateUser} type="submit" className="btn btn-primary">
                    Finish
                </button>
            </Stack>
        </Container>
    )
}

export default BuildProfile