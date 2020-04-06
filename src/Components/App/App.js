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
      }
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
  render() {
    return (
      <>
        <Link to = '/Login'>Login</Link>
        <Route path='/' exact>
          <MoviesContainer movies={this.state.movies} />
        </Route>

        <Route path='/Login' exact>
          <Login login = {this.login}/>
        </Route>
      </>
    );
  };
};

export default App;
