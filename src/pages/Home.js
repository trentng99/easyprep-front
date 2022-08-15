import React from 'react'
import { Button, Container, InputGroup, FormControl, Row, Col, Image } from 'react-bootstrap';
import HeaderBar from '../components/HeaderBar';

import RecipeCard from '../components/RecipeCard';
function Home({ recipes, setRecipes, userdata }) {
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
      <RecipeCard recipes={recipes} setRecipes={setRecipes} userdata={userdata}></RecipeCard>
    </div>
  )
}

export default Home