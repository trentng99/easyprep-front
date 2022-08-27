import React, { useState, useEffect } from 'react'
import { Button, Container, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import HeaderBar from '../components/HeaderBar';
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import RecipeCard from '../components/RecipeCard';
import allergiesList from '../data/allergiesList';
import cuisineList from '../data/cuisineList';
import { reauthenticateWithPhoneNumber } from 'firebase/auth';

function Home({ recipes, setRecipes, userdata }) {

  //Search bar query
  const [query, setQuery] = useState("")
  const [cuisineQuery, setCuisineQuery] = useState("")
  const [allergyQuery, setAllergyQuery] = useState("")

  useEffect(() => {
    const recipesCollectionRef = collection(db, "recipes");

    //Import recipes into a state array
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes()

  }, [setRecipes]);

  //Get Filtered Recipes n
  const getFilteredRecipes = (query, cuisineQuery, allergyQuery) => {
    if (query) {
      return recipes.filter((recipe) => 
      recipe.name.toLowerCase().includes(query.toLowerCase()))
    }
    if (cuisineQuery) {
      return recipes.filter((recipe) => 
      recipe.cuisine.toLowerCase().includes(cuisineQuery.toLowerCase()))
    }
    if (allergyQuery) {
      return recipes.filter((recipe) => {
        for (var i = 0; i < recipe.tags.length; i++) {
          if (recipe.tags[i].value.toLowerCase().includes(allergyQuery.toLowerCase())) {
            return false
          }
        }
        return true
      }
      )
    }
    return recipes
  }

  const filteredItems = getFilteredRecipes(query, cuisineQuery, allergyQuery);

  const handleCuisineSelect = (e) => {
    setCuisineQuery(e)
  }

  const handleAllergySelect = (e) => {
    setAllergyQuery(e)
  }

  return (
    <div className='mb-2 App min-vh-100 justify-content-center align-items-center'>
      <div className="headerPart pb-5 pt-4">
        <Container>
          <HeaderBar image="/chef.png"/>
          <h1 className="text-center text-orange font-weight-bold" xs={12}>Hey {userdata.name}!</h1>
          <p className="text-center text-white" xs={12}>Welcome to Easyprep where you can filter and view recipes that you want to cook. Save the recipes that you like</p>
          <InputGroup className="col-12">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="primary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Container>
      </div>
      <Container>
        <div className='col-12 py-4'>
          <p>Filters:</p>
          <div className='d-flex'>
            <Dropdown onSelect={handleAllergySelect} className='mr-3'>
              <Dropdown.Toggle className='dropdown'>
                I Am Allergic To {allergyQuery ? allergyQuery : ''}
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item eventKey=''>Nothing</Dropdown.Item>
                {allergiesList.map((allergy) => {
                  return <Dropdown.Item key={allergy.value} eventKey={allergy.value}>{allergy.value}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleCuisineSelect}>
              <Dropdown.Toggle className='dropdown'>
                {cuisineQuery ? cuisineQuery : 'All Cuisines'}
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey=''>All Cuisines</Dropdown.Item>
                {cuisineList.map((cuisine) => {
                  return <Dropdown.Item key={cuisine.value} eventKey={cuisine.value}>{cuisine.value}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
      {filteredItems.length > 0
        ?
        <div>
          <Container>
            <div className='col-12 font-weight-bold'>
              {allergyQuery ? 'Now showing recipes without ' + allergyQuery : ''}

            </div>
          </Container>
          <RecipeCard
            recipes={filteredItems}
            userdata={userdata} />
        </div>
        :
        <Container className='text-center pt-4'>
          <h1 >
            Nothing was found...
          </h1>
          <p>Try searching for something else!</p>
        </Container>
      }


    </div>
  )
}

export default Home