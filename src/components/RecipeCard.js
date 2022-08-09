import React, { useState, useEffect } from 'react'
import { Button, Card, CardImg, Container } from 'react-bootstrap';
import { db, storage } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';

function RecipeCard() {
    const [recipes, setRecipes] = useState([]);

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

    return (
        <Container className="d-flex flex-wrap">
            {recipes.map((recipe) => {
                return (
                    <div className='col-6 col-lg-3 p-3 fu'>
                        <Card>
                            <CardImg variant="top"  src={'images/' + recipe.image} />
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