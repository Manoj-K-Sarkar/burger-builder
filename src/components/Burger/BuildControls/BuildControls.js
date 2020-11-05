import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
    const controls = [
        {label: 'Meat',     type: 'meat'},
        {label: 'Cheese',   type: 'cheese'},
        {label: 'Salad',    type: 'salad'},
        {label: 'Paneer',   type: 'paneer'},
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price}</strong></p>
            {
                controls.map(ctrl => 
                    <BuildControl
                        key={ctrl.label} 
                        label={ctrl.label}
                        add={() => props.addIngredient(ctrl.type)}
                        remove={() => props.removeIngredient(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}/>)
            }
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default buildControls;