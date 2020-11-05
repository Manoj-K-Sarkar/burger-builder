import React, {Component} from 'react';

import classes from './Modal.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxilary>
            <Backdrop 
                show={this.props.show} 
                remove={this.props.removePurchasing}></Backdrop>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show? 'tranlateY(0)' : 'tranlateY(-100)',
                    display: this.props.show? 'block' : 'none'
                }}>
                {this.props.children}
            </div>
        </Auxilary>
        );
    }
} 

export default Modal;