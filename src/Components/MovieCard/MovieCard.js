import React from 'react';
import './MovieCard.css'

const MovieCard = ({ title, poster_path, average_rating }) => {
  return(
    <div>
      <h2>{title}</h2>
      <img src={poster_path}></img>
      <p>{average_rating}</p>
    </div>
  );
};

export default MovieCard;