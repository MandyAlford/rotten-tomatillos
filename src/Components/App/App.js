import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import "./App.css";
import Login from "../Login/Login";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import MovieDetails from '../MovieDetails/MovieDetails';
import {showModal} from '../../actions'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: {
        name: "",
        id: null,
        email: "",
      },
      show: false,
    };
  }

  componentDidMount = () => {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v1/movies")
      .then((response) => response.json())
      .then((movies) => this.setState({ movies: movies.movies }));
  };

  logout = () => {
    this.setState({ user: { name: "", id: null, email: "" } });
  };

  // showModal = (e) => {
  //   e.preventDefault();
  //   let updatedState = !this.state.show;
  //   this.setState({ show: updatedState });
  // };

  render() {
    return (
    <div>
      <Route path='/' exact>
        <Header
        />
        <Login login={this.login} show={this.state.show} />
        <MoviesContainer
        movies={this.state.movies}
        />
      </Route>

      <Route path='/movies/:movie_id' exact component={MovieDetails}>
      </Route>
    </div>
    );
  }
}

const mapStateToProps = ({user,show}) => ({
  user,
  show
});

const mapDispatchToProps = dispatch => ( bindActionCreators({showModal},dispatch));

export default connect(mapStateToProps,mapDispatchToProps)(App);
