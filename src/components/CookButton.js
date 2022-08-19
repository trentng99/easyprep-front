import React from 'react'

function CookButton({state, setUserData, userdata}) {

    //Function to update data in database
    const cookedRecipe = async () => {
        await setUserData(previousState => ({
            ...userdata,
            cooked: [...previousState.cooked, state.recipe.id]
        }))
    }

    if (userdata.cooked) {
        if (userdata.cooked.includes(state.recipe.id)) {
            return (
                <button className='success-button'>
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

export default CookButton