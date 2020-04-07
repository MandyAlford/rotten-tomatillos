import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Login.css'
const BASE_URL = 'https://rancid-tomatillos.herokuapp.com/api/v1/login'
const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email:'greg@turing.io',
      password:'abc123',
      errors: {
        email:''
      }
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name,value} = event.target;
    let errors = this.state.errors;
    if(name === "email"){
      errors.email = validEmailRegex.test(value) ? "" : "Email is not valid";
    }
    this.setState({errors,[name]:value})
  }

  handleSubmit = () =>{
    const {login} = this.props;
    let {email,password} = this.state
    let userData = {
      email: email,
      password: password
    }
    fetch(BASE_URL,
      {
        method:'Post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
      }
    )
    .then(response => response.json())
    .then(data => {
      if(data.error){
        this.setState({email:"",password:""})
      } else{
        login(data)
      }
    })
  }

  validateForm = () => {
    let valid = true;
    const {errors, email,password} = this.state;
    valid = errors.email.length === 0 && email !== "" && password!== "";
    return valid;
  }

  render () {
    const {email, password,errors} = this.state;
    let isEnabled = this.validateForm();
    if(!this.props.show){
      return null;
    }
    return (
      <div className = "modal">
      <form>
      <span>{errors.email}</span>
        <input
        type = "text"
        placeholder = "email@provider.com"
        name = "email"
        value = {email}
        onChange = {event => this.handleChange(event)}
        />
        <input
        type = "password"
        placeholder = "Password"
        name = "password"
        value = {password}
        onChange = {event => this.handleChange(event)}
        />
        <button
        disabled = {!isEnabled}
        onClick = {this.handleSubmit}
        >Login</button>
      </form>
      </div>
    )
  }
}

export default Login;
