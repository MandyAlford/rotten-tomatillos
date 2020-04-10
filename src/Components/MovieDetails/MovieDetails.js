import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getMovieDetails } from '../../ApiCalls/ApiCalls'
import './MovieDetails.css'


class MovieDetails extends Component {
  constructor(){
    super()
    this.state= {
      movie: null,
    }
  }

  componentDidMount = () =>{
    getMovieDetails()
      .then(data => this.setState({movie: data.movies.find(x => x.id == this.props.match.params.movie_id)}))
  }

  render() {
    return(
    <div className="movie-detail-container" >
      <div className="movie-detail-backdrop" 
       style={{
        backgroundImage: `url(${
          this.state.movie && this.state.movie.backdrop_path
        })`,
      }}></div>
      {this.state.movie &&
        <div>
          <img 
          className="movie-detail-poster" 
          src={this.state.movie.poster_path} 
          alt= {`${this.state.movie.title} movie poster`}
          />
        </div>
      }
      {this.state.movie &&
        <div>
          <h2 className="movie-detail-title">{this.state.movie.title}</h2>
          <p className="movie-detail-release">Release Date: {this.state.movie.release_date}</p>
          <p className="movie-detail-overview">{this.state.movie.overview}</p>
          <p className="movie-detail-rating">Average Rating: {this.state.movie.average_rating}</p>
        </div>
      }
    </div>
    )
  }
}

export default MovieDetails;
