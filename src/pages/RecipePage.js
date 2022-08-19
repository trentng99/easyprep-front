import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { doc, updateDoc} from "firebase/firestore";
import { db } from '../firebase-config';
import { Container, Image, Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import LikeButton from '../components/LikeButton';
import CookButton from '../components/CookButton';


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

    const goPrevPage = () => {
        navigate(-1)
    }


    return (
        <div className='bg-grey'>
            <Image className='recipe-image' src={"/images/" + state.recipe.image} fluid></Image>
            <Container >
                <Container className='d-flex justify-content-between py-4 px-0'>
                    <span className="material-symbols-outlined" onClick={goPrevPage} style={{ cursor: "pointer" }}>
                        arrow_back
                    </span>
                    <LikeButton state={state} setUserData={setUserData} userdata={userdata} />
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
                    <CookButton state={state} setUserData={setUserData} userdata={userdata}/>
                </div>
            </Container>
        </div>

    )
}

export default RecipePage