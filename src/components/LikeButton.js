import React from 'react'

function LikeButton({state, setUserData, userdata}) {

    //Function to update data in database
    const likedRecipe = async () => {
        if (!userdata.liked.includes(state.recipe.id)) {
            console.log('adding')
            console.log(state.recipe.id)
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

    if (userdata.liked) {
        if (userdata.liked.includes(state.recipe.id)) {
            return (
                <button onClick={likedRecipe} className='success-button'>
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </button>
            )
        }
        else {
            return (
                <button onClick={likedRecipe} className='primary-button'>
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </button>
            )
        }
    }
}

export default LikeButton