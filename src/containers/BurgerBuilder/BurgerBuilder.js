import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHadler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) 
            sum += ingredients[key];
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated)
            this.setState({ purchasing: true });
        else {
            this.props.onSetAuthredirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    removePurchasingHandler = () => this.setState({ purchasing: false });

    proccessContinuedHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    } 

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be Loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxilary>
                    <Burger
                        ingredients={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                </Auxilary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                proccessContinued={this.proccessContinuedHandler}
                proccessCanceled={this.removePurchasingHandler} />;
        }
        return (
            <Auxilary>
                <Modal
                    show={this.state.purchasing}
                    removePurchasing={this.removePurchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
};

const mapStateToProp = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngrredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthredirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withErrorHandler(BurgerBuilder, axios));