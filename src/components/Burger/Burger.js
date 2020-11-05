import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let transformedIngredient = [].concat
        .apply([],Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_,i) => {
                    return <BurgerIngredient key={igKey+i} type={igKey}/>
                });
            })
        );
    if(transformedIngredient.length === 0)
            transformedIngredient = <p>Please Add Some Ingredients</p>;
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="burger-bottom"/>
        </div>
    );
};

export default burger;