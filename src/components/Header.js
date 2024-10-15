import React from "react";
import AppLog from "/public/app_logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div>
        <img className="logo" src={AppLog}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>{onlineStatus ? "✅" : "Offline 🔴"}</li>

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
            <button
              className="login-btn"
              onClick={() => {
                btnName == "Login" ? setbtnName("Logout") : setbtnName("Login");
                console.log("btn clicked : " + btnName);
              }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
