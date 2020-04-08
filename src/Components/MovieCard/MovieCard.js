import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return(
    <div>
    <Link to={`/movies/${movie.id}`}>
      <h2>{movie.title}</h2>
      <img src={movie.poster_path}></img>
      <p>{movie.average_rating}</p>
    </Link>
    </div>
  );
};

export default MovieCard;
