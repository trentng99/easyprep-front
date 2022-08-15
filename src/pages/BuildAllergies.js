import React from 'react'
import allergiesList from '../data/allergiesList';
import { ToggleButtonGroup, Container, ToggleButton, Stack } from 'react-bootstrap';
import { db } from '../firebase-config';
import {doc,updateDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

function BuildProfile({user, state, setState}) {
  let newArray
  let userCollectionRef
  const navigate = useNavigate();
  //Reference to users collection in firebase db
  if(user.email) {
    userCollectionRef = doc(db, "users", user.email)
  }

  const handleCheckboxChange = event => {
    newArray = [...state.allergies, event.target.id];
    if (state.allergies.includes(event.target.id)) {
      newArray = newArray.filter(allergy => allergy !== event.target.id);
    }
    setState({
      ...state,
      allergies: newArray
    })
  };

  //Function to update data in database
  const updateUser = async () => {
    await updateDoc(userCollectionRef, {user_id: user.uid, allergies: state.allergies });
    navigate('/buildcuisine')
  }

  const listOfAllergies = allergiesList.map(
    (allergy) => <ToggleButton id={allergy.value} key={allergy.value} value={allergy.value} onChange={handleCheckboxChange}>{allergy.value}</ToggleButton>
  )

  return (
    <Container >
      <Stack gap={3} className='min-vh-100 d-flex justify-content-center align-items-center'>
        <h1>Do you have any allergies or food you are abstaining from?</h1>
        <ToggleButtonGroup vertical type="checkbox" className="mb-2">
          {listOfAllergies}
        </ToggleButtonGroup>
        <button onClick={updateUser} type="submit" className="btn btn-primary">
          Next
        </button>
      </Stack>
    </Container>
  )
}

export default BuildProfile