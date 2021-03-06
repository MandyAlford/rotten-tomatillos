import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { fetchUserLogin,fetchUserRatings } from "../../ApiCalls/ApiCalls";
import { login,getUserRatings } from "../../actions";
import { showModal } from "../../actions";
import "./Login.css";

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "greg@turing.io",
      password: "abc123",
      errors: {
        email: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if (name === "email") {
      errors.email = validEmailRegex.test(value) ? "" : "Email is not valid";
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { login, showModal, getUserRatings } = this.props;
    let { email, password } = this.state;
    let userData = {
      email: email,
      password: password,
    };
    let data = await fetchUserLogin(userData);
    if (data.error) {
      this.setState({ email: "", password: "" });
    } else {
      login(data);
      let userRatings = await fetchUserRatings(this.props.user.id);
      getUserRatings(userRatings.ratings);
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
    if (!this.props.showLoginModal) {
      return null;
    }
    return (
      <div className="login">
        <div className="modal">
          <div className="login-wrapper">
            <form aria-label="Login Form">
              <span>{errors.email}</span>
              <input
                type="text"
                placeholder="email@provider.com"
                name="email"
                value={email}
                onChange={(event) => this.handleChange(event)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => this.handleChange(event)}
              />
              <button
                disabled={!isEnabled}
                onClick={this.handleSubmit}
                className="submit-btn"
                aria-label = "Submit Log In Form"
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

const mapStateToProps = ({ showLoginModal,user }) => ({
  showLoginModal,
  user
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login, showModal,getUserRatings }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func,
  showModal: PropTypes.func,
  getUserRatings: PropTypes.func,
  showLoginModal: PropTypes.bool,
  user: PropTypes.shape({
    name:PropTypes.string,
    id:PropTypes.number,
    email:PropTypes.string,
  }),
}
