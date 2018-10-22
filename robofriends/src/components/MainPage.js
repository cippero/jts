import React, { Component } from 'react';

import './MainPage.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';


export default class MainPage extends Component {
    componentDidMount() { this.props.onRequestRobots(); }
    render() {
        // console.log(this.props);
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        // setTimeout(() => { console.log(this.props); }, 1000);
        return isPending ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
            <Header />
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>
            </div>
        );
    }
}
