import React from 'react';

const button = (props) =>{
    const classes = ['button'];
    if(typeof props !== 'undefined' && typeof props.type !== 'undefined' ){
        classes.push('button--' + props.type);
    }
   return( 
   <button className={classes.join(' ')} onClick={props.onButtonPress}>
    {props.children}
    </button>
   )
}
export default button;