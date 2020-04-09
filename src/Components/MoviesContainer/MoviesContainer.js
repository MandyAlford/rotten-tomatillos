import React from 'react';
import MovieCard from '../MovieCard/MovieCard'
import './MoviesContainer.css';
import MovieDetails from '../MovieDetails/MovieDetails';


const MoviesContainer = ({ movies }) => {
  const cards = movies.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    );
  });
  return <div className="cards-container">{cards}</div>;
};

export default MoviesContainer;
