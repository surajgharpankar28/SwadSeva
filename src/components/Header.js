import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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

  const handleLoginToggle = () => {
    setBtnName((prev) => (prev === "Sign In" ? "Logout" : "Sign IN"));
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

        <div className="text-left m-auto ml-4 flex">
          <CIcon
            className="text-gray-800 w-[1rem] mr-1"
            icon={cilLocationPin}
          />
          <span className="text-gray-400 text-sm hover:text-black">
            Kolhapur, Maharashtra, India
          </span>
        </div>

        {/* Hamburger Icon for mobile screens */}
        <div className="block sm:hidden">
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
              ? "block absolute top-[60px] left-0 w-full bg-white shadow-lg"
              : "hidden"
          } sm:flex`}
        >
          <ul className="flex space-x-4 sm:flex-row flex-col sm:w-auto w-full">
            <li className="flex items-center px-4 text-center hover:text-orange-500">
              <CIcon className="text-gray-800 w-[1.5rem] mr-2" icon={cilHome} />
              <Link to="/" className="align-middle">
                Home
              </Link>
            </li>
            {/* <li className="flex items-center px-4 text-center hover:text-orange-500">
              <CIcon className="text-gray-800 w-[1.5rem] mr-2" icon={cilInfo} />
              <Link to="/about" className="align-middle">
                About us
              </Link>
            </li> */}
            {/* <li className="flex items-center px-4 text-center hover:text-orange-500">
              <CIcon
                className="text-gray-800 w-[1.5rem] mr-2"
                icon={cilContact}
              />
              
              <Link to="/contact" className="align-middle">
                Contact us
              </Link>
            </li> */}

            <li className="flex items-center px-4 text-center hover:text-orange-500">
              <CIcon className="text-gray-800 w-[1.5rem] mr-2" icon={cilCart} />
              <Link to="/cart" className="align-middle">
                Cart{" "}
                {cartItems.length > 0 ? (
                  <span className="border border-gray-500 font-bold rounded-full px-2 ml-1 border-orange-500">
                    {cartItems.length}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="flex items-center px-4 text-center hover:text-orange-500">
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
