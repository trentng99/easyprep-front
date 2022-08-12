import React, { useState, useEffect} from 'react'
import {Button, Container, InputGroup, FormControl} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase-config";
import RecipeCard from '../components/RecipeCard';
import {
  getDoc,
  doc
} from "firebase/firestore";

function Home({ user, recipes, setRecipes }) {
  const { logout } = useAuth()
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    if (user.email) {
      const usersCollectionRef = doc(db, "users", user.email);
      const getUsers = async () => {
        const data = await getDoc(usersCollectionRef);
        setUserData(data.data());
      };
      getUsers();
    }
  }, [user]);


  return (
    <div className='mb-2 App min-vh-100 justify-content-center align-items-center'>
      <div className="headerPart py-5">
        <Container>
          <h1 className="text-center text-orange font-weight-bold" xs={12}>Hey {userdata.name}!</h1>
          <p className="text-center text-white" xs={12}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <InputGroup className="col-12">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Container>
      </div>
      <RecipeCard recipes={recipes} setRecipes={setRecipes}></RecipeCard>
    </div>
  )
}

export default Home