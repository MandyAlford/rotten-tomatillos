import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={"/movies/"+ movie.id}
      className="movie-card"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)), url(${movie.poster_path})`,
        "backgroundSize": "cover",
      }}
    >
      <div className="title-rating-container">
        <h2 className="movie-card-title">{movie.title}</h2>
        <p className="movie-card-rating">
          <span className="rating-score">
            {movie.average_rating >= 5 ? (
              <i className="fas fa-smile"></i>
            ) : (
              <i className="fas fa-meh"></i>
            )}
            {movie.average_rating}
          </span>{" "}
          out of 10
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
