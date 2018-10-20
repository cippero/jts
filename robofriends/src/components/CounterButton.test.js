import React from 'react';
import { shallow } from 'enzyme'
import CounterButton from './CounterButton';

describe('<CounterButton />', () => {
    it('expect to render CounterButton component', () => {
        const mockColor = 'red';
        expect(shallow(<CounterButton color={mockColor} />)).toMatchSnapshot();
    });
    
    it('expect counter to increment', () => {
        const mockColor = 'red';
        const wrapper = shallow(<CounterButton color={mockColor} />);
        
        wrapper.find('[id="counter"]').simulate('click');
        expect(wrapper.state()).toEqual({ count: 1 });
        expect(wrapper.props().color).toEqual('red');
    });
});
