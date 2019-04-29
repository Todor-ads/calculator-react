import React from 'react';
import KeyRow from './component/keyRow';
import Button from './component/button';

const keyboard = (props) => (
    <section className="keyboard">
        <KeyRow>
            <Button onButtonPress={props.clear} value = 'c'>C</Button>
            <Button onButtonPress={props.backward} value = 'backward'>&larr;</Button>
            <Button onButtonPress={props.forward} value = 'forward'>&rarr;</Button>
             <Button onButtonPress={props.onButtonPress} value = 'dividing'>/</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress} value = 'nine'>9</Button>
            <Button onButtonPress={props.onButtonPress} value = 'eight'>8</Button>
            <Button onButtonPress={props.onButtonPress} value = 'seven'>7</Button>
            <Button onButtonPress={props.onButtonPress} value = 'multiply'>*</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress} value = 'six'>6</Button>
            <Button onButtonPress={props.onButtonPress} value = 'five'>5</Button>
            <Button onButtonPress={props.onButtonPress} value = 'fore'>4</Button>
            <Button onButtonPress={props.onButtonPress} value = 'subtraction'>-</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress} value = 'three'>3</Button>
            <Button onButtonPress={props.onButtonPress} value = 'two'>2</Button>
            <Button onButtonPress={props.onButtonPress} value = 'one'>1</Button>
            <Button onButtonPress={props.onButtonPress} value = 'collect'>+</Button>
        </KeyRow>
        <KeyRow>
            <Button onButtonPress={props.onButtonPress} value = 'zero'>0</Button>
            <Button onButtonPress={props.onButtonPress} value = 'dot'>.</Button>
            <Button onButtonPress={props.calculateResult} value = 'equal'>=</Button>
            <Button onButtonPress={props.onButtonPress} value = 'percentage'>%</Button>
        </KeyRow>
    </section>
)
export default keyboard;