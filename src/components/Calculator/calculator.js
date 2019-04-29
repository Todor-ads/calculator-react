import React, { Component } from 'react';
import Keyboard from './keyboard'
import Result from './result'
import math from 'mathjs'

export default class Calculator extends Component {

    constructor() {
        super()
        this.state = {
            equation: '',
            result: 0,
            resultStore: [],
            index: -1,
            counterMaxLength: 0,
            isContainDot: false,
            maxPossibleOperator: 0
        }
    };

    calculateResult = () => {
        let { resultStore, equation } = this.state;
        let result = math.eval(equation);

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
        return this.setState({ equation: '', result: result, resultStore: resultStore, counterMaxLength: 0, index: index });

    }

    onButtonPress = event => {

        const target = event.target.innerHTML;

        let { equation, maxPossibleOperator, counterMaxLength, isContainDot } = this.state;
        if ((target >= 0 && target <= 9) || target === '.') {

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
        this.setState({ equation: equation });
    }

    clear = () => {
        this.setState({ equation: '', result: 0 });
    }

    forward = () => {

        let {index} = this.state;

        if (index < this.state.resultStore.length - 1) {
            index++;
        }
        const resultObj = this.state.resultStore[index];
        this.setState({ result: resultObj.result, equation: resultObj.equation, index: index });
    }

    backward = () => {
        let index = this.state.index;

        if (index > 0) {
            index--;
        }
        const resultObj = this.state.resultStore[index];
        this.setState({ result: resultObj.result, equation: resultObj.equation, index: index });
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
                        forward={this.forward}
                        backward={this.backward} />

                </main>
            </div>
        )
    }
}