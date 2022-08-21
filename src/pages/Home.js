import React, {useEffect} from 'react'
import { Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import HeaderBar from '../components/HeaderBar';
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";

import RecipeCard from '../components/RecipeCard';
function Home({ recipes, setRecipes, userdata}) {

  useEffect(() => {
    const recipesCollectionRef = collection(db, "recipes");

    //Import recipes into a state array
    const getRecipes = async () => {
        const data = await getDocs(recipesCollectionRef);
        setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(recipes)
    };
    getRecipes()

}, [setRecipes]);

  return (
    <div className='mb-2 App min-vh-100 justify-content-center align-items-center'>
      <div className="headerPart pb-5 pt-4">
        <Container>
          <HeaderBar />
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
      <RecipeCard
        recipes={recipes}
        userdata={userdata} />
    </div>
  )
}

export default Home