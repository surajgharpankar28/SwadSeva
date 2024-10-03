import React from "react";
import ReactDOM from "react-dom/client";

import AppLogo from "./public/app_logo.png";

/**
 * Header
 * - Logo
 * - Nav Items
 * Body
 * - Search
 * - Restaurant Container
 *      - Restaurant Card
 *          - Img
 *          - Name of Restro, Star Rating, cuisine, delivery time
 * Footer
 * - Copyright
 * - Links
 * - Address
 * - Contact
 */

const Header = () => {
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
        </ul>
      </div>
    </div>
  );
};

const RestroCard = () => {
  return (
    <div className="res-card">
      <img
        className="res-img"
        alt="res-img"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/4/9/dabf99d0-5c51-480b-9895-bce02d2bde9f_e9ffa04d-e57a-4548-a085-0cc9c2e465cc.JPG"
      />
      <h3>Meghana Foods</h3>
      <h4>Biryani, North Indian</h4>
      <h5>Ratings : 4.4</h5>
      <h5>Delivery in 35 mins</h5>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="restaurant-container">
        <RestroCard /> <RestroCard /> <RestroCard /> <RestroCard />{" "}
        <RestroCard /> <RestroCard /> <RestroCard /> <RestroCard />{" "}
        <RestroCard /> <RestroCard /> <RestroCard />
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
