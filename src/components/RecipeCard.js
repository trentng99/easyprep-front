import React, { useState, useEffect } from 'react'
import { Card, CardImg, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";

function RecipeCard({recipes, setRecipes}) {
    const navigate = useNavigate()


    useEffect(() => {
        const recipesCollectionRef = collection(db, "recipes");

        //Import recipes into a state array
        const getRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getRecipes()

    }, []);

    const shortenString = (string) => {
        var length = 20;
        var trimmedString = string.substring(0, 40);
        return trimmedString + '...'
    }

    const goRecipePage = (recipe) => {
       navigate('/recipe/' + recipe.name, {state: recipe})
    }

    return (
        <Container className="d-flex flex-wrap">
            {recipes.map((recipe) => {
                return (
                    <div
                        className='col-6 col-lg-3 p-3 fu'
                        key={recipe.name}
                        onClick={() => goRecipePage(
                            recipe
                        )}
                        style={{ cursor: "pointer" }}>
                        <Card tag="a" >
                            <CardImg variant="top" src={'images/' + recipe.image} />
                            <Card.Body>
                                <Card.Text>{recipe.cuisine}</Card.Text>
                                <Card.Title className='card-subtitle'>{recipe.name}</Card.Title>
                                <Card.Text>
                                    {shortenString(recipe.description)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                )
            })}
        </Container>
    )
}

export default RecipeCard