import React from 'react';
import './MovieCard.css'

const MovieCard = ({ title, poster_path, average_rating, showMovieDetails, id, backdrop_path, release_date, overview,  }) => {
  return(
    <div onClick={showMovieDetails} id={id}>
    <link to{`/movies/${id}`}>
      <h2>{title}</h2>
      <img src={poster_path}></img>
      <p>{average_rating}</p>
    </link>
    </div>
  );
};

export default MovieCard;
