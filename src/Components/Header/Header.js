import React from "react";
import "./Header.css";
import tomato from "../../assets/tomato.png";
import {showModal} from '../../actions';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';

const Header = ({ logout, showModal, user,show }) => {
  return (
    <div className="header">
      <div className="logo-nav">
        <img className="nav-tomato" src={tomato} alt="" />

        <h1 className="nav-title">Rancid Tomatillos</h1>
      </div>
      {user.name !== "" ? (
        <button
          className="nav-btn"
          onClick={(e) => {
            logout(e);
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="nav-btn"
          onClick={(e) => {
            showModal(true);
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({show}) => ({
  show
});

const mapDispatchToProps = dispatch => ( bindActionCreators({showModal},dispatch));

export default connect(mapStateToProps,mapDispatchToProps)(Header);
