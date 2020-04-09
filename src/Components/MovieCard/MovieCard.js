import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ title, poster_path, average_rating, id }) => {
  return (
    <Link
      to={"/movies/" + id}
      className="movie-card"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)), url(${poster_path})`,
      }}
    >
      <div className="title-rating-container">
        <h2 className="movie-card-title">{title}</h2>
        <p className="movie-card-rating">
          <span className="rating-score">
            {average_rating >= 5 ? (
              <i className="fas fa-smile"></i>
            ) : (
              <i className="fas fa-meh"></i>
            )}
            {average_rating}
          </span>{" "}
          out of 10
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
