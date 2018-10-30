import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

    render () {
        // const { onRouteChange } = this.props;
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                        style={{cursor: 'pointer'}}>
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 ba h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu 
                        right
                        className="b--transparent shadow-5"
                        style={{marginTop: '25px', backgroundColor: '#FFFFFF88'}}>
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={this.props.signOut}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}