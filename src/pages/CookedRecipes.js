import React, {useEffect, useState} from 'react'
import HeaderBar from '../components/HeaderBar'
import { Container } from 'react-bootstrap'
import RecipeCard from '../components/RecipeCard'
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import RecipeCard2 from '../components/RecipeCard2'

function CookedRecipes({ userdata }) {

    const [cookedRecipes, setCookedRecipes] = useState([]);

    useEffect(() => {
        const recipesCollectionRef = collection(db, "recipes");

        //Import recipes into a state array
        const getRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setCookedRecipes([])
            data.docs.map((doc) => {
                userdata.cooked.map((cookedRecipe) => {
                    if (doc.id === cookedRecipe.id) {
                        setCookedRecipes(current => [...current, doc.data()])
                    }
                })
            }
            )
        };
        getRecipes()
    }, [userdata]);

  return (
    <Container>
        <HeaderBar image="https://firebasestorage.googleapis.com/v0/b/agile-project-83be0.appspot.com/o/easyprep2.png?alt=media&token=05bc5ddc-ecc8-4085-8625-56093d47cb31"/>
        <h1>Cooked Recipes</h1>
        <RecipeCard2
        recipes={cookedRecipes}
        userdata={userdata} />
    </Container>
  )
}

export default CookedRecipes