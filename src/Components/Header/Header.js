import React from "react";
import "./Header.css";
import {Link} from 'react-router-dom'
import tomato from "../../assets/tomato.png";
import { showModal, logout } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';

export const Header = ({ logout, showModal, user }) => {
  return (
    <div className="header">
      <Link className = "home-link" to = "/">
        <div className="logo-nav">
          <img className="nav-tomato" src={tomato} alt="" />

          <h1 className="nav-title">Rancid Tomatillos</h1>
        </div>
      </Link>
      {user.name !== "" ? (
        <div className="greeting-btn-container" aria-label = "User Greeting">
          <div className="greeting">Hello, {user.name}</div>
          <button
            aria-label = "Sign Out"
            className="nav-btn"
            onClick={() => {
              logout();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          aria-label = "Sign In"
          className="nav-btn"
          onClick={() => {
            showModal(true);
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ showModal, logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);


Header.propTypes = {
  logout: PropTypes.func,
  showModal: PropTypes.func,
  error: PropTypes.string,
  user: PropTypes.shape({
    name:PropTypes.string,
  }),
}
