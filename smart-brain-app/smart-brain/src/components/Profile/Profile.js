import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }

    handleUpdateChange = (e) => { this.setState({ [e.target.id]: e.target.value }); }

    handleUpdateSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formInput: this.state})
        })
        .then(res => {
            this.props.toggleModal();
            this.props.loadUser({...res, ...this.state});
        })
        .catch(console.log);
    }

    render() {
        const { toggleModal, user } = this.props;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="h3 w3 dib" alt="avatar" />
                        <h1>{this.state.name}</h1>
                        <h4>Images Submitted: 5</h4>
                        <p>Member Since: January</p>
                        <hr />
                        <form action="POST" onSubmit={this.handleUpdateSubmit}>
                            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                            <input
                                autoFocus
                                className="pa2 ba w-100"
                                placeholder={user.name}
                                type="text"
                                name="user-name"
                                id="name"
                                onChange={this.handleUpdateChange}
                            />
                            <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                            <input
                                className="pa2 ba w-100"
                                placeholder={user.age}
                                type="text"
                                name="user-age"
                                id="age"
                                onChange={this.handleUpdateChange}
                            />
                            <label className="mt2 fw6" htmlFor="user-name">Pet:</label>
                            <input
                                className="pa2 ba w-100"
                                placeholder={user.pet}
                                type="text"
                                name="user-pet"
                                id="pet"
                                onChange={this.handleUpdateChange}
                            />
                            <div className="mt4" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                                        onClick={this.handleUpdateSubmit}>
                                    Save
                                </button>
                                <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                                        onClick={toggleModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                </article>
            </div>
        );
    }
}