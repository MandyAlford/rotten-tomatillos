import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesContainer.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import { connect } from "react-redux";

export const MoviesContainer = ({ movies,user }) => {
  const cards = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} user = {user} />;
  });
  return <div className="cards-container">{cards}</div>;
};

const mapStateToProps = ({ movies,user }) => ({
  movies,
  user
});

export default connect(mapStateToProps)(MoviesContainer);
