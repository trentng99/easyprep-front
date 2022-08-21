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
        <Container className="d-flex flex-wrap p-0">
            {recipes.map((recipe, index) => {
                return (
                    <div
                        className='col-12 p-3'
                        key={index}
                        onClick={() => goRecipePage(
                            recipe
                        )}
                        style={{ cursor: "pointer" }}>
                        <Card tag="a" className='d-flex flex-row card2'>
                            <CardImg className='col-6 cover w-100 p-0' variant="top" src={'/images/' + recipe.image} />
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <div>
                                    <Card.Title className='card-subtitle py-4'>{recipe.name}</Card.Title>
                                    <Card.Text>
                                        Cooked On: {userdata.cooked.slice().reverse()[index].time_cooked}
                                    </Card.Text>
                                </div>
                                <Card.Text className='d-flex flex-row align-content-center'>
                                    <Card.Text className='pr-2 steps'>Cook Again</Card.Text> 
                                    <span className="material-symbols-outlined steps">arrow_forward</span>
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