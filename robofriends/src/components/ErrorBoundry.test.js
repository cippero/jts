import React from 'react';
import { shallow } from 'enzyme'
import ErrorBoundry from './ErrorBoundry';

it('expect to render ErrorBoundry component', () => {
    expect(shallow(<ErrorBoundry />)).toMatchSnapshot();
});
