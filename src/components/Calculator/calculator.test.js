import React from 'react';
import { shallow, mount } from 'enzyme';
import Calculator from './calculator';
import sinon from 'sinon'

describe('Calculator component', () => {
    it('default state', () => {
        const wrapper = shallow(<Calculator />);
        const { equation, result, resultStore, index, counterMaxLength, isContainDot, tempEquationScreen, currentIndex } = wrapper.state();
        expect(equation).toEqual('');
        expect(result).toEqual(0);
        expect(resultStore).toEqual([]);
        expect(index).toEqual(-1)
        expect(counterMaxLength).toEqual(0);
        expect(isContainDot).toEqual(false);
        expect(tempEquationScreen.length).toEqual(1);
        expect(currentIndex).toEqual(0);
    });

})

describe('functionality onButtonPress', () => {


    it('add simple calculate value one plus one', () => {
        const eventFK = sinon.spy()
        const wrapper = mount(<Calculator onButtonPress={eventFK} />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + 1');
    })

    it('ignoring a percentage at the first part beginning of the expression', () => {
        const eventFK = sinon.spy()
        const wrapper = mount(<Calculator onButtonPress={eventFK} />);
        wrapper.find('button.button_percentage')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('');
    })

    it('ignoring all operators not equal to plus or minus  at the first part of the expression', () => {
        const eventFK = sinon.spy()
        const wrapper = mount(<Calculator onButtonPress={eventFK} />);
        wrapper.find('button.button_percentage')
            .simulate('click')
        wrapper.find('button.button_dividing')
            .simulate('click')
        wrapper.find('button.button_multiply')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1');
    })

    it('allowed only one operators between two parts of expression', () => {
        //const eventFK = sinon.spy()
        const wrapper = mount(<Calculator />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_percentage')
            .simulate('click')
        wrapper.find('button.button_dividing')
            .simulate('click')
        wrapper.find('button.button_multiply')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + 1');
    })

});
describe('check for correct calculation ', () => {
    it('dividing to zero', () => {
        const wrapper = mount(<Calculator />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_dividing')
            .simulate('click')
        wrapper.find('button.button_zero')
            .simulate('click')
        wrapper.find('button.button_equal')
            .simulate('click')
        const { equation, result } = wrapper.state();
        expect(equation).toEqual('');
        expect(result).toEqual(Number.POSITIVE_INFINITY);
    })
})
describe('functionality clear', () => {
    it('clearing the result after computation', () => {
        const wrapper = mount(<Calculator />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_equal')
            .simulate('click')
        wrapper.find('button.button_c')
            .simulate('click')
        const { equation, result } = wrapper.state();
        expect(equation).toEqual('');
        expect(result).toEqual(0);
    })
})

describe('functionality to save result to result store', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Calculator />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_equal')
            .simulate('click')
        wrapper.find('button.button_two')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_two')
            .simulate('click')
        wrapper.find('button.button_equal')
            .simulate('click')
    })

    it('save correctly in store', () => {
        const { resultStore } = wrapper.state();
        expect(resultStore.length).toEqual(2);
    })
})

describe('functionality to move left and right to equation', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Calculator />);
        wrapper.find('button.button_one')
            .simulate('click')
        wrapper.find('button.button_collect')
            .simulate('click')
        wrapper.find('button.button_one')
            .simulate('click')
    })

    it('move left to equation', () => {
        wrapper.find('button.button_backward')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + ')
    })

    it('try not to leave the left of an equation', () => {
        wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_backward')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('')
    })

    it('move one time left and back to right to equation', () => {
        wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_forward')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + 1')
    })

    it('move two time left and back to right to equation', () => {
        wrapper.find('button.button_backward')
            .simulate('click')
            wrapper.find('button.button_backward')
            .simulate('click')
        wrapper.find('button.button_forward')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + ')
    })

    it('try not to leave the right of an equation', () => {
        wrapper.find('button.button_forward')
            .simulate('click')
        wrapper.find('button.button_forward')
            .simulate('click')
        const { equation } = wrapper.state();
        expect(equation).toEqual('1 + 1')
    })
})