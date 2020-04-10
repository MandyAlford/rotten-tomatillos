import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getMovieDetails } from '../../ApiCalls/ApiCalls'


class MovieDetails extends Component {
  constructor(){
    super()
    this.state= {
      movie: null
    }
  }

  componentDidMount = () =>{
    getMovieDetails()
      .then(data => this.setState({movie: data.movies.find(x => x.id == this.props.match.params.movie_id)}))
  }

  render() {
    return(
      <div className="movie-detail-container" style={{backgroundImage: `url(${this.state.movie.backdrop_path})`}}>
      {this.state.movie &&
        <div>
          <h2 className="movie-detail-title">{this.state.movie.title}</h2>
          <img 
          className="movie-detail-poster" 
          src={this.state.movie.poster_path} 
          alt= {`${this.state.movie.title} movie poster`}
          />
          {/* <img 
          className="movie-detail-backdrop" 
          src={this.state.movie.backdrop_path} 
          alt={`${this.state.movie.title} movie backdrop`}
          /> */}
          <p className="movie-detail-release">{this.state.movie.release_date}</p>
          <p className="movie-detail-overview">{this.state.movie.overview}</p>
          <p className="movie-detail-rating">{this.state.movie.average_rating}</p>
        </div>
      }
      </div>
    )
  }
}

export default MovieDetails;
