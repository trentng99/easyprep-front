import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";


function CookButton({state, setUserData, userdata}) {

    const [cooked, setCooked] = useState([])
    const navigate = useNavigate()

    console.log(userdata)

    //Function to update data in database
    const cookedRecipe = async () => {
        if(userdata.length) {
            await setUserData(previousState => ({
                ...userdata,
                cooked: [...previousState.cooked, { id: state.recipe.id, time_cooked: Date().toLocaleString() }]
            }))
            navigate('/cooksuccess')
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        if (userdata.cooked) {
            setCooked([])
            userdata.cooked.map((recipe) => {
                setCooked(previousState => [...previousState, recipe.id])
            })
        }
    }, [userdata])

    if (cooked.includes(state.recipe.id)) {
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

export default CookButton