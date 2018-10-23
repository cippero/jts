import React from 'react';
import { shallow } from 'enzyme'
import CounterButton from './CounterButton';

let wrapper;

beforeEach(() => {
    const mockColor = 'red';
    wrapper = shallow(<CounterButton color={mockColor} />);
});

describe('<CounterButton />', () => {
    it('expect to render CounterButton component', () => { expect(wrapper).toMatchSnapshot(); });
    
    it('expect counter to increment', () => {
        wrapper.find('[id="counter"]').simulate('click');
        expect(wrapper.state()).toEqual({ count: 1 });
        expect(wrapper.props().color).toEqual('red');
    });

    it('expect comp to only re-render if count changes', () => {
        expect(wrapper.instance().shouldComponentUpdate({color: 'red'}, {count: 0})).toBe(false);
        expect(wrapper.instance().shouldComponentUpdate({color: 'red'}, {count: 1})).toBe(true);
    });
});
