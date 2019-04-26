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
            counterMaxLenght: 0
        }
    };

    calculateResult = () => {

        let result = math.eval(this.state.equation)
        let resultStore = this.state.resultStore;
        let resultObj = {
            result: result,
            equation: this.state.equation
        }
        resultStore.push(resultObj)
        let index = this.state.index;
        index++;
        return this.setState({ equation: '', result: result, resultStore: resultStore, counterMaxLenght: 0, index: index })

    }

    onButtonPress = event => {

        const target = event.target.innerHTML;

        let equation = this.state.equation;
        if ((target >= 0 && target <= 9) || target === '.') {
            if (this.state.counterMaxLenght >= 9) {
                return;
            }
            this.setState({ counterMaxLenght: this.state.counterMaxLenght + 1 })
            equation += target;

        } else if (target === '+' || target === '-' || target === '*' || target === '/' || target === '%') {
            this.setState({ counterMaxLenght: 0 })
            equation += ' ' + target + ' ';

        }
        this.setState({ equation: equation })
    }

    clear = () => {
        console.log()
        this.setState({ equation: '', result: 0 })
    }

    forward = () => {
        let index = this.state.index;
        if (index >= this.state.resultStore.length ) {
            return;
        }
        const resultObj = this.state.resultStore[index];
        index++;
        this.setState({ result: resultObj.result, equation: resultObj.equation, index: index })
    }

    backward = () => {
        let index = this.state.index;
        if (index <= 0) {
            return;
        }
        const resultObj = this.state.resultStore[index];
        index--;
        this.setState({ result: resultObj.result, equation: resultObj.equation, index: index })
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