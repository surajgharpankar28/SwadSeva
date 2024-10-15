import React from "react";
import AppLog from "/public/app_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <img className="logo" src={AppLog}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>Cart</li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
