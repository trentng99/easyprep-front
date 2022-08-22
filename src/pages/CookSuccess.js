import React from 'react'
import HeaderBar from '../components/HeaderBar'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";

function CookSuccess() {

    const navigate = useNavigate()

    const redirect = (link) => {
        navigate(link)
    }

  return (
    <Container>
        <HeaderBar />
        <Image className='w-100 mt-4' fluid src='/cooksuccess.png' alt="Cooking Image" />
        <h1 className='header-title text-center py-2'>Yay! You’ve cooked yourself a healthy meal</h1>
        <p className='text-center py-2'>Mercedem aut nummos unde unde extricat, amaras. Contra legem facit qui id facit quod lex prohibet.</p>
        <button className='primary-button w-100 my-4' onClick={()=>redirect('/profile/cooked-recipes')}>
                View Cooked Recipes
        </button>
        <p className='text-center w-100 steps' onClick={()=>redirect('/home')}>
                Back to Home
        </p>
    </Container>
  )
}

export default CookSuccess