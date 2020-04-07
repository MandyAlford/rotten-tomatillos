import React, { Component } from 'react';
import { Route,Link } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import MoviesContainer from '../MoviesContainer/MoviesContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: {
        name:"",
        id:null,
        email:""
      },
      show:false
    };
  };

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => this.setState({ movies: movies.movies }))
  };
  login = (userData) => {
    this.setState({...userData,show:false})
  }

  logout = () => {
    this.setState({user:{name:"",id:null,email:""}})
  }

  showModal = e => {
    e.preventDefault();
    let updatedState = !this.state.show
    this.setState({show:updatedState})
  }

  render() {
    return (
      <>
        {
          this.state.user.name!==""?
          <button  onClick={e => {this.logout(e);}}>
            Sign Out
          </button>
          :<button  onClick={e => {this.showModal(e);}}>
            Sign In
          </button>
        }

        <Route path='/' exact>
          <Login login = {this.login} show = {this.state.show}/>
          <MoviesContainer movies={this.state.movies} />
        </Route>

      </>
    );
  };
};

export default App;
