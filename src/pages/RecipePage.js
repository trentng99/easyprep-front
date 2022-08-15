import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase-config';
import { Container, Image, Row, Col, Form, ToggleButton } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";



function RecipePage({ userdata, user, setUserData }) {
    const [checked, setChecked] = useState(false);
    const { state } = useLocation();
    let userCollectionRef
    const navigate = useNavigate()

    useEffect(() => {
        if (user.email) {
            updateDoc(userCollectionRef, userdata)
        }
    }, [userdata, userCollectionRef])


    if (user.email) {
        userCollectionRef = doc(db, "users", user.email)
    }

    //Function to update data in database
    const cookedRecipe = async () => {
        await setUserData(previousState => ({
            ...userdata,
            cooked: [...previousState.cooked, state.recipe.id]
        }))
    }

    //Function to update data in database
    const likedRecipe = async () => {
        if (!userdata.liked.includes(state.recipe.id)) {
            console.log('adding')
            await setUserData(previousState => ({
                ...userdata,
                liked: [...previousState.liked, state.recipe.id]
            }))
        } else {
            console.log('deleting')
            await setUserData(previousState => ({
                ...userdata,
                liked: previousState.liked.filter(recipe => recipe !== state.recipe.id)
            }));
        }
    }

    const goPrevPage = () => {
        navigate(-1)
    }

    const IsCookedButton = () => {
        if (userdata.cooked) {
            if (userdata.cooked.includes(state.recipe.id)) {
                return (
                    <button  className='success-button'>
                        Added To Your Cooked Recipes
                    </button>
                )
            }
            else {
                return (
                    <button onClick={cookedRecipe} className='primary-button'>
                        I've Cooked This
                    </button>
                )
            }
        }
    }

    const IsLikedButton = () => {
        if (userdata.cooked) {
            if (userdata.liked.includes(state.recipe.id)) {
                return (
                    <button onClick={likedRecipe} className='success-button'>
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                    </button>
                )
            }
            else {
                return (
                    <button onClick={likedRecipe} className='primary-button'>
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                    </button>
                )
            }
        }
    }

    return (
        <div className='bg-grey'>
            <Image className='recipe-image' src={"/images/" + state.recipe.image} fluid></Image>
            <Container >
                <Container className='d-flex justify-content-between py-4 px-0'>
                    <span className="material-symbols-outlined" onClick={goPrevPage} style={{ cursor: "pointer" }}>
                        arrow_back
                    </span>
                    <IsLikedButton />
                </Container>
                <div className='pt-2'>
                    {state.recipe.cuisine}
                </div>
                <h1 className='pb-2'>
                    {state.recipe.name}
                </h1>
                <div className='pt-1'>
                    {state.recipe.description}
                </div>
                <div className='py-3'>
                    <h5>Time required:</h5>
                    <Row className='shadow-box'>
                        <Col className='d-flex'>
                            <p className='pr-1'>Preparation:</p>
                            {state.recipe.cooktime}mins
                        </Col>
                        <Col className='d-flex'>
                            <p className='pr-1'>Cook:</p>
                            {state.recipe.preptime}mins
                        </Col>
                    </Row>
                </div>
                <div className='py-3'>
                    <h5>Tagged with</h5>
                    <Row className='d-flex ingredient-box'>
                        {state.recipe.tags.map((i) => {
                            return (
                                <div key={i.value}>
                                    {i.value}
                                </div>
                            )
                        })}
                    </Row>
                </div>
                <div className='py-3'>
                    <h5>Ingredients List</h5>
                    {state.recipe.ingredient.map((i, index) => {
                        return (
                            <div key={index} className='ingredient-box mb-2'>
                                <Form.Check
                                    type='checkbox'
                                    id={i.ingredient}
                                    label={i.ingredient}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className='py-2'>
                    <h5>Directions</h5>
                    {state.recipe.direction.map((i, index) => {
                        return (
                            <div key={i.direction} className='ingredient-box mb-3'>
                                <div className='steps'>
                                    Step {index + 1}
                                </div>
                                {i.direction}
                            </div>
                        )
                    })}
                </div>
                <div className="d-grid gap-2 py-4">
                    <IsCookedButton></IsCookedButton>
                </div>
            </Container>
        </div>

    )
}

export default RecipePage