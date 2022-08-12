import React from 'react'
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Card, CardImg, Image } from 'react-bootstrap';


function RecipePage() {

    const { state } = useLocation();

    return (
        <div>
                <Image src={"/images/" + state.image}></Image>
            <div>
                {state.cuisine}
            </div>
            <h1>
                {state.name}
            </h1>
            <div>
                {state.description}
            </div>
            <div>
                {state.cooktime}
            </div>
            <div>
                {state.preptime}
            </div>
            <div>
                <h1>Ingredients</h1>
                {state.ingredient.map((i) => {
                    return (
                        <div key={i.ingredient} className='pb-4'>
                            {i.ingredient}
                        </div>
                    )
                })}
            </div>
            <div>
                <h1>Directions</h1>
                {state.direction.map((i) => {
                    return (
                        <div className='pb-4' key={i.direction}>
                            {i.direction}
                        </div>
                    )
                })}
            </div>
            {/* {state.tags} */}
        </div>

    )
}

export default RecipePage