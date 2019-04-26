import React from 'react';
import KeyRow from './component/keyRow';
import Button from './component/button';

const keyboard = (props) => (
    <section className="keyboard">
        <KeyRow>
            <Button onButtonPress={props.clear}>C</Button>
            <Button onButtonPress={props.backward}>&larr;</Button>
            <Button onButtonPress={props.forward}>&rarr;</Button>
             <Button onButtonPress={props.onButtonPress}>/</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress}>9</Button>
            <Button onButtonPress={props.onButtonPress}>8</Button>
            <Button onButtonPress={props.onButtonPress}>7</Button>
            <Button onButtonPress={props.onButtonPress}>*</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress}>6</Button>
            <Button onButtonPress={props.onButtonPress}>5</Button>
            <Button onButtonPress={props.onButtonPress}>4</Button>
            <Button onButtonPress={props.onButtonPress}>-</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress}>3</Button>
            <Button onButtonPress={props.onButtonPress}>2</Button>
            <Button onButtonPress={props.onButtonPress}>1</Button>
            <Button onButtonPress={props.onButtonPress}>+</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress}>0</Button>
            <Button onButtonPress={props.onButtonPress}>.</Button>
            <Button onButtonPress={props.calculateResult}>=</Button>
            <Button onButtonPress={props.onButtonPress}>%</Button>
        </KeyRow>
    </section>
)
export default keyboard;