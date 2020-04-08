import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, poster_path, average_rating }) => {
  return (
    <div
      className="movie-card"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)), url(${poster_path})`,
        "background-size": "cover",
      }}
    >
      {/* <img className="card-image" src={poster_path}></img> */}
      <div className="title-rating-container">
        <h2 className="movie-card-title">{title}</h2>
        <p className="movie-card-rating">
          <span className="rating-score">
            {average_rating > 5 ? (
              <i class="fas fa-smile"></i>
            ) : (
              <i class="fas fa-meh"></i>
            )}
            {average_rating}
          </span>{" "}
          out of 10
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
