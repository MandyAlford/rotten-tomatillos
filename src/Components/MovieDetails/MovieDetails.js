import React, { Component } from 'react';
import { Route } from 'react-router-dom';


class MovieDetails extends Component {
  constructor(){
    super()
    this.state= {
      movie: null
    }
  }

  componentDidMount = () =>{
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(data => this.setState({movie: data.movies.find(x => x.id == this.props.match.params.movie_id)}))
  }

  render() {
    return(
      <div>
      {this.state.movie &&
        <div>
          <h2>{this.state.movie.title}</h2>
          <img src={this.state.movie.poster_path} alt= {`${this.state.movie.title} movie poster`}/>
          <img src={this.state.movie.backdrop_path} alt={`${this.state.movie.title} movie backdrop`}/>
          <p>{this.state.movie.release_date}</p>
          <p>{this.state.movie.overview}</p>
          <p>{this.state.movie.average_rating}</p>
        </div>
      }
      </div>
    )
  }
}

export default MovieDetails;
