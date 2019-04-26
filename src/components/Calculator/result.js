import React from 'react'
import ResultScreen from './component/resultScreen';
import ComputationScreen from './component/computationScreen';

    const result = (props) => {
    return (
        <section className='screen'>
            <ResultScreen>{props.result}</ResultScreen>
            <ComputationScreen>{props.equation}</ComputationScreen>
        </section>
    )
}
export default result