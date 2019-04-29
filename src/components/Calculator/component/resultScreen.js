import React from 'react'; 

const resultScreen= (props)=>{
    const classes = ["result-screen "] 
    if(props.children.toString().length>=9){
        classes.push('medium')
    }
    return(<div className={classes.join('')}>{props.children}</div>)
}
export default resultScreen