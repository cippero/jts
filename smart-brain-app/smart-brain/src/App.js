import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin', //signin
  isSignedIn: false, //false
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: 0
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }).then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user);
                this.onRouteChange('home');
              }
            })
        }
      })
      .catch(console.log)
  }

  loadUser = (data) => {
    if (data.id) {
      this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          pet: data.pet,
          age: data.age
        }
      });
    } else {
      console.log(this.state);
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          name: data.name,
          pet: data.pet,
          age: data.age
        }
      }));
    }
  }

  calculateFacesLocations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        return {
          leftCol: face.region_info.bounding_box.left_col * width,
          topRow: face.region_info.bounding_box.top_row * height,
          rightCol: width - (face.region_info.bounding_box.right_col * width),
          bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
        }
      });
    }
    return
  }

  displayFaceBox = (boxes) => { boxes && this.setState({boxes}); }

  onInputChange = (event) => { this.setState({input: event.target.value}); }

  onButtonSubmit = () => {
    const token = window.sessionStorage.getItem('token');
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          const faces = response.outputs[0].data.regions.length;
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              id: this.state.user.id,
              faces
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFacesLocations(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => this.setState(prevState => ({...prevState, isProfileOpen: !prevState.isProfileOpen}));

  signOut = () => {
    const token = window.sessionStorage.getItem('token');
    fetch('http://localhost:3000/signout', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    .then(() => { 
      window.sessionStorage.removeItem('token');
      this.onRouteChange('signout');
    })
    .catch(console.log);
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                    toggleModal={this.toggleModal}
                    signOut={this.signOut} />
        { isProfileOpen &&
          <Modal>
            <Profile  isProfileOpen={isProfileOpen} 
                      toggleModal={this.toggleModal} 
                      user={this.state.user} 
                      loadUser={this.loadUser} />
          </Modal>
        }
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
