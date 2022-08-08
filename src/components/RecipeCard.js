import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";

function RecipeCard() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const recipesCollectionRef = collection(db, "recipes");
        const getRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getRecipes()

    }, []);
return (
    <Container>
    {recipes.map((recipe) => {
        return (
            <div>
                {recipe.name}
                hello
            </div>
        )
        })}
    </Container>
)
}

export default RecipeCard