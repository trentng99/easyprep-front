import React, {useEffect, useState} from 'react'
import HeaderBar from '../components/HeaderBar'
import { Container } from 'react-bootstrap'
import RecipeCard from '../components/RecipeCard'
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";

function SavedRecipes({userdata }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const recipesCollectionRef = collection(db, "recipes");

    //Import recipes into a state array
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setFilteredRecipes([])
      data.docs.map((doc) => {
        userdata.liked.map((likedRecipe) => {
          if(doc.id === likedRecipe) {
            setFilteredRecipes(current => [...current, doc.data()])
          }
        })
      }
      )
    };
    getRecipes()
  }, [userdata]);

  return (
    <Container>
      <HeaderBar />
      <h1>Saved Recipes</h1>
      <RecipeCard
        recipes={filteredRecipes}
        userdata={userdata} />
    </Container>
  )
}

export default SavedRecipes