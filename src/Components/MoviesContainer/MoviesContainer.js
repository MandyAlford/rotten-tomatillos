import React from 'react';
import MovieCard from '../MovieCard/MovieCard'
import './MoviesContainer.css';

const MoviesContainer = ({ movies }) => {
  const cards = movies.map(movie => {
    return (
      <MovieCard 
        key={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        backdrop_path={movie.backdrop_path}
        release_date={movie.release_date}
        overview={movie.overview}
        average_rating={movie.average_rating}
      />
    );
  });
  return(
    <div className='cards-container'>
      { cards }
    </div>
  );
};

export default MoviesContainer;