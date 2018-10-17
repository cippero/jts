import React, { Component } from 'react';
import './App.css';

import Page1 from './Components/Page1';
import AsyncComponent from './AsyncComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null
    }
  }

  onRouteChange = (route) => this.setState({ route: route });

  render() {
    if (this.state.route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    } else if (this.state.route === 'page2') {
      const AsyncPage2 = AsyncComponent(() => import("./Components/Page2"));
      return <AsyncPage2 onRouteChange={this.onRouteChange} />
    } else {
      const AsyncPage3 = AsyncComponent(() => import("./Components/Page3"));
      return <AsyncPage3 onRouteChange={this.onRouteChange} />
    }
  }
}

export default App;
