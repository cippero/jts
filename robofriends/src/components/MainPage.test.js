import React from 'react';
import { shallow } from 'enzyme'
import MainPage from '../components/MainPage';

let wrapper;

beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    };
    wrapper = shallow(<MainPage { ...mockProps } />);
});

it('expect to render MainPage component', () => {
    expect(wrapper).toMatchSnapshot();
});

describe('filterRobots function', () => {
    it('filters an empty input correctly', () => {
        expect(wrapper.instance().filterRobots()).toEqual([]);
    });

    it('filters a non-empty, matching input correctly', () => {
        const mockProps2 = {
            onRequestRobots: jest.fn(),
            robots: [{
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }],
            searchField: 'john',
            isPending: false
        };
        const wrapper2 = shallow(<MainPage { ...mockProps2 } />);
        expect(wrapper2.instance().filterRobots().length).toEqual(1);
    });

    it('filters a non-empty, non-matching input correctly', () => {
        const mockProps3 = {
            onRequestRobots: jest.fn(),
            robots: [{
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }],
            searchField: 'a',
            isPending: false
        };
        const wrapper3 = shallow(<MainPage { ...mockProps3 } />);
        expect(wrapper3.instance().filterRobots()).toEqual([]);
    });
});

it('shows the loading screen correctly', () => {
    const mockProps4 = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: true
    };
    const wrapper4 = shallow(<MainPage { ...mockProps4 } />);
    expect(wrapper4.find('[id="loading"]').exists()).toBe(true);
});
