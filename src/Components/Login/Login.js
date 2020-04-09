import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { fetchUserLogin } from "../../ApiCalls/ApiCalls";
import { login } from "../../actions";
import { showModal } from "../../actions";
import "./Login.css";

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "greg@turing.io",
      password: "abc123",
      errors: {
        email: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if (name === "email") {
      errors.email = validEmailRegex.test(value) ? "" : "Email is not valid";
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { login, showModal } = this.props;
    let { email, password } = this.state;
    let userData = {
      email: email,
      password: password
    };
    let data = await fetchUserLogin(userData);
    if (data.error) {
      this.setState({ email: "", password: "" });
    } else {
      login(data);
      showModal(false);
    }
  };

  validateForm = () => {
    let valid = true;
    const { errors, email, password } = this.state;
    valid = errors.email.length === 0 && email !== "" && password !== "";
    return valid;
  };

  render() {
    const { email, password, errors } = this.state;
    let isEnabled = this.validateForm();
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="login">
        <div className="modal">
          <div className="login-wrapper">
            <form>
              <span>{errors.email}</span>
              <input
                type="text"
                placeholder="email@provider.com"
                name="email"
                value={email}
                onChange={event => this.handleChange(event)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={event => this.handleChange(event)}
              />
              <button
                disabled={!isEnabled}
                onClick={this.handleSubmit}
                className="submit-btn"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
        <div className="mask"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ show }) => ({
  show
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, showModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
