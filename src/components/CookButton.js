import React, {useEffect, useState} from 'react'

function CookButton({state, setUserData, userdata}) {

    const [cooked, setCooked] = useState([])

    //Function to update data in database
    const cookedRecipe = async () => {
        await setUserData(previousState => ({
            ...userdata,
            cooked: [...previousState.cooked, { id: state.recipe.id, time_cooked: Date().toLocaleString() }]
        }))
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