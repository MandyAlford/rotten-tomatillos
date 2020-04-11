import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import Login from "../Login/Login";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import MovieDetails from "../MovieDetails/MovieDetails";
import { getMovies } from "../../actions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getMovies } = this.props;
    fetch("https://rancid-tomatillos.herokuapp.com/api/v1/movies")
      .then((response) => response.json())
      .then((movies) => getMovies(movies.movies));
  };

  render() {
    return (
      <div>
        <Route path="/" exact>
          <Header />
          <Login />
          <MoviesContainer />
        </Route>
        <Route path="/movies/:movie_id" exact component={MovieDetails}></Route>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getMovies }, dispatch);

export default connect(null, mapDispatchToProps)(App);
