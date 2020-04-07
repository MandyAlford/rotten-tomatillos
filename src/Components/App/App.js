import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

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

  showMovieDetails =(e) => {
    debugger
  }

  render() {
    return (
    <div>
      <Route path='/' exact>
        <MoviesContainer
        movies={this.state.movies}
        showMovieDetails={this.showMovieDetails}
        />
      </Route>

      <Route path='/movies/:movie.id' exact>
        <MovieDetails />
      </Route>
    </div>
    );
  };
};

export default App;
