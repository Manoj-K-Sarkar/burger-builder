import React from 'react';

import classes from './Backdrop.css';

const backdrop = props => {
    return (
        <div 
            className={classes.Backdrop}
            style={{display: props.show ? 'block' : 'none'}}
            onClick={props.remove}>
        </div>
    );
};

export default backdrop;