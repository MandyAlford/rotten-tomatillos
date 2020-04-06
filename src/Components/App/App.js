import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MoviesContainer from '../MoviesContainer/MoviesContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  };

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => this.setState({ movies: movies.movies }))
  };

  render() {
    return (
    <Route path='/' exact>
      <MoviesContainer movies={this.state.movies} />
    </Route>
    );
  };
};

export default App;
