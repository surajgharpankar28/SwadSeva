import React, { useEffect, useState } from "react";
import CuratedFoodType from "./CuratedFoodType";

// shimmer card unit
const shimmer_card_unit = 4;

// CuratedFoodTypeShimmer unit
const CuratedFoodTypeShimmer_unit = 3;

// shimmer Menu card unit
const shimmer_menu_card_unit = 5;

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
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height for centering
    textAlign: "center",
    position: "absolute", // Position above all other content
    top: 0,
    left: 0,
    width: "100%", // Full width of the viewport
    zIndex: 10, // Ensures it's above the shimmer cards
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional semi-transparent background
  };

  const style = {
    height: "5rem",
  };

  const card = {
    width: "3rem",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowTimeoutMessage(true);
      }
    }, 10000); // Timeout message after 10 second

    // Cleanup timer on component unmount or when `isLoading` changes
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {/* Centered Message */}
      {showTimeoutMessage && (
        <div className="flex flex-col" style={centerStyle}>
          <p>
            I'm using free instance of{" "}
            <a
              target="_blank"
              href="https://render.com/"
              style={{
                marginTop: "10px",
                backgroundColor: "transparent", // No background
                color: "#007bff", // Text color
                border: "none", // No border
                textDecoration: "underline", // Underline the text
                cursor: "pointer",
              }}
            >
              Render
            </a>{" "}
            which will spin down with inactivity, which can delay requests by 50
            seconds or more.
          </p>
          <h1>
            Still waiting?
            <button
              onClick={() => window.location.reload()} // Refreshes the page
              style={{
                marginTop: "10px",
                paddingLeft: "5px",
                paddingRight: "5px",
                backgroundColor: "transparent", // No background
                color: "#007bff", // Text color
                border: "none", // No border
                textDecoration: "underline", // Underline the text
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
            the page and let’s fix that.
          </h1>
        </div>
      )}

      {/* Shimmer Cards */}
      {Array(CuratedFoodTypeShimmer_unit) // Replace 10 with CuratedFoodTypeShimmer_unit as needed
        .fill("")
        .map((_, index) => (
          <div key={index} className="shimmer-card p-4 pt-[5rem]" style={card}>
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
        ))}
    </>
  );
};

export const MenuShimmer = () => {
  return (
    <>
      <div className="w-12/12 sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto p-4">
        <div className="flex justify-between h-40 cursor-pointer shimmer-card animate-pulse mb-2">
          <span className="font-bold w-full h-full bg-gray-300 rounded"></span>
        </div>

        {Array(shimmer_menu_card_unit)
          .fill("")
          .map((_, index) => (
            <div
              className="p-2 m-2 text-center flex flex-col sm:flex-row justify-between shimmer-card animate-pulse"
              key={index}
            >
              <div className="w-full sm:w-8/12">
                <div className="py-2 flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
                </div>
                <div className="mt-1">
                  <p className="text-xs w-[80%] h-4 bg-gray-300 rounded mb-2"></p>
                  <p className="text-xs w-[80%] h-4 bg-gray-300 rounded mb-2"></p>
                  <p className="text-xs w-[80%] h-4 bg-gray-300 rounded mb-2"></p>
                </div>
              </div>
              <div className="w-full sm:w-4/12 flex align-bottom items-center">
                <div className="relative">
                  <div className="w-[130px] h-[90px] bg-gray-300 rounded-lg mb-2"></div>
                  <div className="p-2 w-16 h-6 bg-gray-300 rounded-lg "></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
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
