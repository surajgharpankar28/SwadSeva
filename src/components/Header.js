import { useState } from "react";
import AppLogo from "/public/app_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");

  return (
    <div className="header">
      <div className="">
        <img className="logo" src={AppLogo} alt="Logo" />
        <h1>SwadSeva</h1>
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
