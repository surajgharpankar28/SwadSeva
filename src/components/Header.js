import React from "react";
import AppLog from "/public/app_logo.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const contextData = useContext(UserContext);

  //  console.log(contextData);

  //selector - Redux Toolkit, it is a hook
  //subscribing to store using useSelector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <>
      <div className="flex justify-between bg-gray-300 sm:bg-white">
        <div className="logo-container">
          <img className="w-24 ml-10 shadow-xl" src={AppLog} />
        </div>
        <div className="nav-items flex items-center">
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
              <Link to="/cart">Cart ({cartItems.length} item) </Link>
            </li>
            <li className="px-4">
              <button
                className="login-btn"
                onClick={() => {
                  btnName == "Login"
                    ? setbtnName("Logout")
                    : setbtnName("Login");
                  console.log("btn clicked : " + btnName);
                }}
              >
                {btnName}
              </button>
            </li>
            <li className="px-4 font-bold">{contextData.loggedInUser}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
