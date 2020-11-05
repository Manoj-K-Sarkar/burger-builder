import React, {Component} from 'react';

import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'uppercase'}}>
                        {igKey} : {this.props.ingredients[igKey]}
                    </span>
                </li>
            );
        });

        return (
            <Auxilary>
                <p>You have selected these tasty ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Confirm your Order?</p>
                <p>Total Price: <strong>{this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.props.proccessCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.proccessContinued}>CONFIRM</Button>
            </Auxilary>
        ); 
    }
};

export default OrderSummary;