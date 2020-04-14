import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesContainer.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import { connect } from "react-redux";

const getDate = (movie, user) => {
  const rating = user.ratings.find((rating) => rating.movie_id === movie.id);
  return rating ? new Date(rating.created_at) : undefined;
};

const sortByDateRated = (movies, user) => {
  return movies.sort((prevMovie, nextMovie) => {
    const prevMovieDate = getDate(prevMovie, user);
    const nextMovieDate = getDate(nextMovie, user);
    if (!prevMovieDate) {
      return 1;
    }
    if (!nextMovieDate) {
      return -1;
    }
    return nextMovieDate - prevMovieDate;
  });
};

export const MoviesContainer = ({ movies, user }) => {
  if (user.name) {
    movies = sortByDateRated(movies, user);
  } else {
    movies = movies.sort((a, b) => a.id - b.id);
  }
  const cards = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });
  return <div className="cards-container">{cards}</div>;
};

const mapStateToProps = ({ movies,user }) => ({
  movies,
  user
});

export default connect(mapStateToProps)(MoviesContainer);
