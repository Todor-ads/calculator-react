import React, { Component } from 'react';
import Keyboard from './keyboard'
import Result from './result'
import math from 'mathjs'


export default class Calculator extends Component {

    constructor() {
        super()
        this.state = this.getInitialState()
    };

    getInitialState = () => {
        const INITIAL_STATE = {
            equation: '',
            result: 0,
            resultStore: [],
            index: -1,
            counterMaxLength: 0,
            isContainDot: false,
            maxPossibleOperator: 0,
            tempEquationScreen: [""],
            currentIndex: 0
        }
        return INITIAL_STATE
    }

    calculateResult = () => {
        let { resultStore, equation } = this.state;
        let result
        try {
            result = math.eval(equation);

        } catch (err) {
            return this.setState({ result: 'Error' })
        }
        if (equation.length === 0) {
            return
        }
        let resultObj = {
            result: result,
            equation: equation
        };
        resultStore.push(resultObj);
        let index = this.state.index;
        index++;
        return this.setState({ equation: '', result: result, resultStore: resultStore, counterMaxLength: 0, index: index, tempEquationScreen: [""], currentIndex: 0 });

    }

    onButtonPress = event => {

        const target = event.target.innerHTML;

        let { equation, maxPossibleOperator, counterMaxLength, isContainDot, tempEquationScreen, currentIndex } = this.state;
        if ((target >= 0 && target <= 9) || target === '.' || target === '(' || target === ')') {

            if (counterMaxLength >= 9) {
                return;
            }
            if (target === '.') {
                if (isContainDot) { return };
                this.setState({ isContainDot: true });
            }
            this.setState({ counterMaxLength: this.state.counterMaxLength + 1, maxPossibleOperator: 0 });
            equation += target;

        } else if (target === '+' || target === '-' || target === '*' || target === '/' || target === '%') {
            if (maxPossibleOperator >= 1) {
                return
            }
            if ((target === '*' || target === '/' || target === '%') && equation.length === 0) {
                return;
            }
            this.setState({ isContainDot: false });
            this.setState({ counterMaxLength: 0, maxPossibleOperator: 1, isContainDot: false });
            equation += ' ' + target + ' ';

        }
        currentIndex++
        tempEquationScreen.push(equation)
        this.setState({ equation: equation, tempEquationScreen: tempEquationScreen, currentIndex: currentIndex });
    }

    clear = () => {
        this.setState({ equation: '', result: 0 });
    }

    resetState = () => {
        this.setState(this.getInitialState)
    }
    forwardEquation = () => {

        let { currentIndex, tempEquationScreen } = this.state;
        if (tempEquationScreen.length === 0) {
            return
        }
        if (currentIndex < tempEquationScreen.length - 1) {
            currentIndex++;
        }
        const resultEquation = tempEquationScreen[currentIndex]
        this.setState({ equation: resultEquation, currentIndex: currentIndex })
    }

    backwardEquation = () => {
        let { currentIndex, tempEquationScreen } = this.state;

        if (currentIndex > 0) {
            currentIndex--;
        }
        if (tempEquationScreen.length === 0) {
            return
        }
        const resultEquation = tempEquationScreen[currentIndex]
        this.setState({ equation: resultEquation, currentIndex: currentIndex })
    }

    render() {

        return (
            <div className="calculator">
                <main>
                    <Result
                        equation={this.state.equation}
                        result={this.state.result} />

                    <Keyboard
                        onButtonPress={this.onButtonPress}
                        calculateResult={this.calculateResult}
                        clear={this.clear}
                        resetState={this.resetState}
                        forward={this.forwardEquation}
                        backward={this.backwardEquation} />
                </main>
            </div>
        )
    }
}