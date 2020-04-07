import React, { Component } from 'react';
import { Route,Link } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import MoviesContainer from '../MoviesContainer/MoviesContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: {
        name:"",
        id:null,
        email:""
      },
      show:false
    };
  };

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => this.setState({ movies: movies.movies }))
  };
  login = (userData) => {
    this.setState({...userData})
  }

  showModal = e => {
    let updatedState = !this.state.show
    this.setState({show:updatedState})
  }

  render() {
    return (
      <>
          <button  onClick={e => {
              this.showModal();
              }}
          > Login </button>
        <Route path='/' exact>
          <Login login = {this.login} show = {this.state.show}/>
        </Route>
        <Route path='/' exact>
          <MoviesContainer movies={this.state.movies} />
        </Route>

      </>
    );
  };
};

export default App;
