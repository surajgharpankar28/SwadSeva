import { useState } from "react";
import AppLogo from "/public/app_logo.png";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  return (
    <div className="header">
      <div>
        <img className="logo" src={AppLogo} alt="Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
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
