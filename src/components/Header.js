import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLog from "/public/app_logo.png";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext); // Destructured for simplicity

  const cartItems = useSelector((store) => store.cart.items);

  const handleLoginToggle = () => {
    setBtnName((prev) => (prev === "Login" ? "Logout" : "Login"));
    //console.log("Button clicked:", btnName);
  };

  return (
    <div className="flex justify-between sm:bg-white border-b-2 border-gray-300 shadow-lg">
      <div className="logo-container mt-2 mb-2 ">
        <img
          className="w-14 rounded-[2rem]  ml-10 shadow-xl"
          src={AppLog}
          alt="App Logo"
        />
      </div>
      <div className="nav-items flex items-center mr-4">
        <ul className="flex">
          <li className="px-4">{onlineStatus ? "✅" : "Offline 🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="px-4 font-bold">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
          <li className="px-4">
            <button className="login-btn" onClick={handleLoginToggle}>
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
