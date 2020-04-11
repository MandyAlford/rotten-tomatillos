import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesContainer.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import { connect } from "react-redux";

const MoviesContainer = ({ movies }) => {
  console.log(movies);
  const cards = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });
  return <div className="cards-container">{cards}</div>;
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps)(MoviesContainer);
