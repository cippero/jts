import React from 'react';
import { shallow } from 'enzyme'
import MainPage from '../components/MainPage';

it('expect to render MainPage component', () => {
    expect(shallow(<MainPage />)).toMatchSnapshot();
    // expect(1).toEqual(1);
});
