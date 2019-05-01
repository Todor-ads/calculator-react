import React from 'react';

const button = (props) =>{
    const classes = ['button_'];
    if(typeof value !== 'undefined' && typeof props.value !== 'undefined' ){
        classes.push('button--' + props.value);
    }
   return( 
<button className={'button_'+ props.value +" button"} onClick={props.onButtonPress}>
    {props.children}
    </button>
   )
}
export default button;