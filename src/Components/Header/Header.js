import React from "react";
import "./Header.css";
import tomato from "../../assets/tomato.png";
import { showModal, logout } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const Header = ({ logout, showModal, user }) => {
  return (
    <div className="header">
      <div className="logo-nav">
        <img className="nav-tomato" src={tomato} alt="" />

        <h1 className="nav-title">Rancid Tomatillos</h1>
      </div>
      {user.name !== "" ? (
        <div className="greeting-btn-container">
          <div className="greeting">Hello, {user.name}</div>
          <button className="nav-btn" onClick={() => logout()}>
            Sign Out
          </button>
        </div>
      ) : (
        <button
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
