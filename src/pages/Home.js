import React, {useState, useEffect} from 'react'
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

function Home({ recipes, setRecipes, userdata}) {

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
      console.log(recipes)
    };
    getRecipes()

  }, [setRecipes]);

  //Get Filtered Recipes n
  const getFilteredRecipes = (query  ,cuisineQuery) => {
    if (!query && !cuisineQuery) {
      return recipes
    }
    if (!cuisineQuery) {
      return recipes.filter((recipe) => 
      recipe.name.toLowerCase().includes(query.toLowerCase()))
    }
    if (!query ) {
      return recipes.filter((recipe) => 
      recipe.cuisine.toLowerCase().includes(cuisineQuery.toLowerCase()))
    }
    return recipes.filter((recipe) => 
    recipe.name.toLowerCase().includes(query.toLowerCase()) && recipe.cuisine.toLowerCase().includes(cuisineQuery.toLowerCase()))
  }

  const filteredItems = getFilteredRecipes(query, cuisineQuery);

  const handleCuisineSelect = (e) => {
    console.log(e)
    setCuisineQuery(e)
  }

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
            <Dropdown className='mr-3'>
              <Dropdown.Toggle className='dropdown'>
                Allergies
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {allergiesList.map((allergy) => {
                  return <Dropdown.Item key={allergy.value}>{allergy.value}</Dropdown.Item>
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
      <RecipeCard
        recipes={filteredItems}
        userdata={userdata} />
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