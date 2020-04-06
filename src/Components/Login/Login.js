import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password:'',
      errors: {
        email:''
      }
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name,value} = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid";
        break;
      default:
        break;
    }
    this.setState({errors,[name]:value})
  }

  validateForm = () => {
    let valid = true;
    const {errors, email,password} = this.state;
    valid = errors.email.length ===0 && email !=="" && password!== "";
    return valid;
  }

  render () {
    const {email, password,errors} = this.state;
    let isEnabled = this.validateForm();
    return (
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
          <Link to = "/" >
          <button
            disabled = {!isEnabled}
          >Login</button>
          </Link>
        </form>
    )
  }
}

export default Login;
