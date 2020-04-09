import React from "react";
import "./Header.css";
import tomato from "../../assets/tomato.png";

const Header = ({ logout, showModal, user }) => {
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
            showModal(e);
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Header;
