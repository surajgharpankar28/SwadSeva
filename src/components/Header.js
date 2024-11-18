import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import AppLog from "/public/app_logo.png";
import Swadseva from "/public/swadseva.jpg";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { CIcon } from "@coreui/icons-react";
import {
  cilLocationPin,
  cilHome,
  cilInfo,
  cilContact,
  cilCart,
  cilUser,
  cilMenu,
} from "@coreui/icons";

const Header = () => {
  const [btnName, setBtnName] = useState("Sign In");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu visibility
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext); // Destructured for simplicity
  const cartItems = useSelector((store) => store.cart.items);
  const cartItemsQuantity = cartItems.reduce((totalQuantity, item) => {
    return totalQuantity + (item.quantity || 0); // Add each item's quantity to the total
  }, 0);
  const handleLoginToggle = () => {
    setBtnName((prev) => (prev === "Sign In" ? "Logout" : "Sign In"));
  };

  return (
    <div className="sm:bg-white border-b-2 border-gray-300 shadow-lg">
      <div className="w-10/12 flex justify-between m-auto">
        <div className="logo-container mt-2 mb-2">
          <Link to="/" className="flex items-center">
            <img
              className="w-12 rounded-[2rem] ml-10 shadow-xl"
              src={AppLog}
              alt="App Logo"
            />
            <h1
              style={{ fontFamily: "'Kaushan Script', cursive" }}
              className="text-4xl text-orange-500 ml-2"
            >
              Swadseva
            </h1>
          </Link>
        </div>

        <div className="text-left m-auto ml-4 flex hidden sm:flex">
          <CIcon
            className="text-gray-800 w-[1rem] mr-1"
            icon={cilLocationPin}
          />
          <span className="text-gray-400 text-sm hover:text-black">
            Kolhapur, Maharashtra, India
          </span>
        </div>

        {/* Hamburger Icon for mobile screens */}
        <div className="block sm:hidden flex justify-start">
          <button
            className="text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CIcon icon={cilMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`nav-items flex items-center mr-4 ${
            isMenuOpen
              ? "block absolute top-[60px] pb-12 left-0 w-full bg-white shadow-lg z-50 sm:hidden"
              : "hidden"
          } sm:flex`}
        >
          <ul className="flex space-x-4 sm:flex-row flex-col sm:w-auto w-full">
            <li className="flex items-center px-4 text-center pb-4 pt-4 pl-8 sm:pb-0 sm:pt-0 sm:pl-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-bold flex items-center mr-2"
                    : "text-gray-800 flex items-center mr-2"
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center">
                    <CIcon
                      className={
                        isActive
                          ? "text-orange-500 w-[1.5rem] mr-2"
                          : "text-gray-800 w-[1.5rem] mr-2"
                      }
                      icon={cilHome}
                    />
                    <span>Home</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* <li className="flex items-center px-4 text-center pb-4 sm:pb-0">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-bold flex items-center"
                    : "text-gray-800 flex items-center"
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center">
                    <CIcon
                      className={
                        isActive
                          ? "text-orange-500 w-[1.5rem] mr-2"
                          : "text-gray-800 w-[1.5rem] mr-2"
                      }
                      icon={cilInfo}
                    />
                    <span>About us</span>
                  </div>
                )}
              </NavLink>
            </li>

            <li className="flex items-center px-4 text-center pb-4 sm:pb-0">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-bold flex items-center"
                    : "text-gray-800 flex items-center"
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center">
                    <CIcon
                      className={
                        isActive
                          ? "text-orange-500 w-[1.5rem] mr-2"
                          : "text-gray-800 w-[1.5rem] mr-2"
                      }
                      icon={cilContact}
                    />
                    <span>Contact us</span>
                  </div>
                )}
              </NavLink>
            </li> */}

            <li className="flex items-center px-4 text-center pb-4 sm:pb-0">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-bold flex items-center"
                    : "text-gray-800 flex items-center"
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center">
                    <CIcon
                      className={
                        isActive
                          ? "text-orange-500 w-[1.5rem] mr-2"
                          : "text-gray-800 w-[1.5rem] mr-2"
                      }
                      icon={cilCart}
                    />
                    <span>
                      Cart{" "}
                      {cartItems.length > 0 && (
                        <span className="border border-gray-500 font-bold rounded-full px-2 ml-1 border-orange-500">
                          {cartItemsQuantity}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>

            <li className="flex items-center px-4 text-center pb-4 sm:pb-0">
              <button
                className="login-btn flex items-center"
                onClick={handleLoginToggle}
              >
                <CIcon
                  className="text-gray-800 w-[1.5rem] mr-2"
                  icon={cilUser}
                />
                <span className="align-middle">{btnName}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
