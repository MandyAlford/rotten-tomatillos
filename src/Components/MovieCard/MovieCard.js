import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const MovieCard = ({ movie, user }) => {
  const userRating = user.ratings.find(
    (rating) => rating.movie_id === movie.id
  );
  return (
    <Link
      to={"/movies/" + movie.id}
      className="movie-card"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)), url(${movie.poster_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="title-rating-container">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="average-user-ratings-container">
          <div className="average-rating-container">
            <p className="rating-category">Avg rating</p>
            <p className="rating-score">
              {movie.average_rating >= 5 ? (
                <i className="fas fa-smile"></i>
              ) : (
                <i className="fas fa-meh"></i>
              )}
              {movie.average_rating.toFixed(1)}
            </p>
          </div>
          {userRating && (
            <div className="homepage-user-rating-container">
              <p className="rating-category">Your rating</p>
              <p className="rating-score">
                <i className="fas fa-star"></i>
                {userRating.rating.toFixed(1)}
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(MovieCard);
