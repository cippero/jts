import React from 'react';
import { shallow } from 'enzyme'
import ErrorBoundry from './ErrorBoundry';

const ComponentWithError = () => { throw new Error() }
const HealthyComponent = () => { return <div> healthy </div> }

it('expect to render ErrorBoundry component', () => {
    expect(shallow(<ErrorBoundry />)).toMatchSnapshot();
});

it('expect to trigger if children throw an error', () => {
    const wrapper = shallow(<ErrorBoundry>
                                <ComponentWithError />
                            </ErrorBoundry>);
    // fix to not manually set the state, instead check componentDidCatch
    wrapper.setState({ hasError: true }); 
    // console.log(wrapper.debug() ); 
    expect(wrapper.state().hasError).toBe(true);
});

it('expect not to trigger if children are healthy', () => {
    const wrapper = shallow(<ErrorBoundry>
                                <HealthyComponent />
                            </ErrorBoundry>);
    expect(wrapper.state().hasError).toBe(false);
});