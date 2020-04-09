import React from "react";
import "./Header.css";
import tomato from "../../assets/tomato.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-nav">
        <img className="nav-tomato" src={tomato} alt="" />

        <h1 className="nav-title">Rancid Tomatillos</h1>
      </div>
      <button className="nav-btn">Log in</button>
    </div>
  );
};

export default Header;
