import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./MovieDetails.css";
import { connect } from "react-redux";
import { getUserRatings } from "../../actions";
import { bindActionCreators } from "redux";
import { submitRating, fetchUserRatings, getMovieDetails, removeRating } from "../../ApiCalls/ApiCalls";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      rating: null,
    };
  }

  componentDidMount = () => {
    getMovieDetails(this.props.match.params.movie_id).then((data) =>
      this.setState({
        movie: data.movie
      })
    );
  };

  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ rating: value });
  };

  handleClick = async (e, movieId) => {
    try {
      let response = await submitRating(
        this.props.user.id,
        parseInt(movieId),
        parseInt(this.state.rating)
      );
      if (response.error) {
        throw Error("Submit unsuccessful");
      }
      let userRatings = await fetchUserRatings(this.props.user.id);
      this.props.getUserRatings(userRatings.ratings);
    } catch (error) {
      console.log(error);
    }
  };


  handleRemoveRatingClick = async (userId, ratingId) => {
    try {
     let response = await removeRating(
        userId,
        ratingId
      )
      if(response.status !== 204) {
        throw Error('Delete unsuccessful');
      }
    }
    catch(error) {
      console.log(error)
    }
    let userRatings = await fetchUserRatings(this.props.user.id);
    this.props.getUserRatings(userRatings.ratings);
  }

  render() {
    const movieId = parseInt(this.props.match.params.movie_id);
    let userRating = this.props.user.ratings.find(
        (rating) => rating.movie_id === movieId
      );

    return (
      <div className="movie-detail-container">
        <div
          className="movie-detail-backdrop"
          style={{
            backgroundImage: `url(${
              this.state.movie && this.state.movie.backdrop_path
            })`,
          }}
        ></div>
        {this.state.movie && (
          <div>
            <img
              className="movie-detail-poster"
              src={this.state.movie.poster_path}
              alt={`${this.state.movie.title} movie poster`}
            />
          </div>
        )}
        {this.state.movie && (
          <div className="title-ratings-container">
            <h2 className="movie-detail-title">{this.state.movie.title}</h2>
            <p className="movie-detail-release">
              Release Date: {this.state.movie.release_date}
            </p>
            <p className="movie-detail-overview">{this.state.movie.overview}</p>
            <div className="ratings">
              <div className="rating-container">
                <p className="movie-detail-rating rating-title">
                  Average Rating
                </p>
                <p className="rating-number">
                  {this.state.movie.average_rating.toFixed(1)}
                </p>
              </div>

              {this.props.user.name!='' &&
                (userRating ? (
                  <div className="rating-container">
                    <p className="rating-title">Your rating</p>
                    <p className="rating-number">{userRating.rating}</p>
                    <button className="rating-btn" onClick={(e) => this.handleRemoveRatingClick(this.props.user.id, userRating.id)}>Remove Rating</button>
                  </div>
                ) : (
                  <div className="user-rating-container">
                    <select
                      name="pets"
                      id="pet-select"
                      onChange={this.handleChange}
                      className="select"
                      aria-label = "Select User Rating"
                    >
                      <option value="">Select your rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <button
                      className="rating-btn"
                      onClick={(e) => this.handleClick(e, movieId)}
                    >
                      Rate this movie
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUserRatings: (ratings) => dispatch(getUserRatings(ratings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
