import React, { useEffect } from 'react'
import { Card, CardImg, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";

function RecipeCard({recipes, userdata}) {
    const navigate = useNavigate()

    const shortenString = (string) => {
        var trimmedString = string.substring(0, 40);
        return trimmedString + '...'
    }

    const goRecipePage = (recipe) => {
       navigate('/recipe/' + recipe.name, {state: {recipe:recipe, userdata: userdata}})
    }

    return (
        <Container className="d-flex flex-wrap">
            {recipes.map((recipe, index) => {
                return (
                    <div
                        className='col-12 col-lg-3 p-3 fu'
                        key={index}
                        onClick={() => goRecipePage(
                            recipe
                        )}
                        style={{ cursor: "pointer" }}>
                        <Card tag="a" className='card'>
                            <CardImg className='card-img' variant="top" src={'/images/' + recipe.image} />
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