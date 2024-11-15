import React from "react";
import CuratedFoodType from "./CuratedFoodType";

// shimmer card unit
const shimmer_card_unit = 8;

// CuratedFoodTypeShimmer unit
const CuratedFoodTypeShimmer_unit = 5;

// shimmer Menu card unit
const shimmer_menu_card_unit = 10;

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img stroke animate"></div>
      <div className="shimmer-title stroke animate"></div>
      <div className="shimmer-tags stroke animate"></div>
      <div className="shimmer-details">
        <div className="shimmer-details-rating stroke animate"></div>
        <div className="shimmer-details-rating stroke animate"></div>
        <div className="shimmer-details-rating stroke animate"></div>
      </div>
    </div>
  );
};

export const CuratedFoodTypeShimmer = () => {
  const style = {
    height: "5rem",
  };
  const card = {
    width: "3rem",
  };
  return (
    <>
      {Array(CuratedFoodTypeShimmer_unit)
        .fill("")
        .map((element, index) => (
          <>
            <div className="shimmer-card p-4" style={card}>
              <div className="menu-items-list">
                <div
                  className="shimmer-img stroke animate h-32 mb-2"
                  style={style}
                ></div>

                <div className="shimmer-details flex space-x-2">
                  <div className="shimmer-details-rating stroke animate w-6 h-6"></div>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
};

export const MenuShimmer = () => {
  return (
    <div className="restaurant-menu shimmer-width">
      <div className="restaurant-summary stroke-color animate">
        <img className="shimmer-img stroke animate" />
        <div className="restaurant-summary-details">
          <h2 className="shimmer-menu-title  stroke animate"></h2>
          <p className="shimmer-items stroke animate"></p>
          <div className="shimmer-details">
            <div className="shimmer-details-rating stroke animate"></div>
            <div className="shimmer-details-rating stroke animate"></div>
            <div className="shimmer-details-rating stroke animate"></div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap ">
            <h3 className="shimmer-menu-content stroke animate"></h3>
            <p className="shimmer-menu-count stroke animate"></p>
          </div>
          <div className="menu-items-list">
            {Array(shimmer_menu_card_unit)
              .fill("")
              .map((element, index) => (
                <div className="shimmer-menu-card" key={index.toString() + 1}>
                  <div className="shimmer-item-details">
                    <h3 className="shimmer-w50  stroke animate"></h3>
                    <p className="shimmer-w20  stroke animate"> </p>
                    <p className="shimmer-w70  stroke animate"></p>
                  </div>
                  <div className="shimmer-img-wrapper">
                    <img className="shimmer-img stroke animate" />
                    <div className="shimmer-btn stroke animate"> </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {/* create a new Array instance using Array() constructor and map through every element of array */}
      {Array(shimmer_card_unit)
        .fill("")
        .map((element, index) => {
          return <CardShimmer key={index.toString() + 1} />;
        })}
    </div>
  );
};
export default Shimmer;
