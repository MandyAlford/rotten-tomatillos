import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import Login from "../Login/Login";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import MovieDetails from "../MovieDetails/MovieDetails";
import { getMovies, fetchError } from "../../actions";
import { fetchMovies } from "../../ApiCalls/ApiCalls"

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getMovies, fetchError } = this.props;
    fetchMovies().then((movies) => getMovies(movies.movies))
      .catch(errorMessage => fetchError(errorMessage))
  }

  render() {

    return (
      <div>
        <Route path="/" exact>
          <Header />
          <Login />
          {!this.props.error.isError ? <MoviesContainer/>: <p> {this.props.error.errorMessage} </p>}
        </Route>
        <Route path="/movies/:movie_id" exact component={MovieDetails}></Route>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getMovies, fetchError }, dispatch);

const mapStateToProps = ({ error }) => ({ error })

export default connect(mapStateToProps, mapDispatchToProps)(App);
