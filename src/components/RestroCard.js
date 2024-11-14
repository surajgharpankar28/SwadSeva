import React from "react";
import { CON_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestroCard = ({ resData }) => {
  const {
    id,
    name,
    cuisines = [],
    avgRating,
    cloudinaryImageId,
    deliveryTime,
    areaName,
    aggregatedDiscountInfoV3,
  } = resData?.info || {};

  const RestroImageForMenuItems = CON_URL + cloudinaryImageId;

  console.log(RestroImageForMenuItems);
  // Utility function to render discount info
  const renderDiscountInfo = () => {
    const { header, subHeader } = aggregatedDiscountInfoV3 || {};
    return header || subHeader ? `${header || ""} ${subHeader || ""}` : "";
  };

  // Utility function to format cuisines
  const formatCuisines = () => {
    const cuisineString = cuisines.join(", ");
    return cuisineString.length > 30
      ? `${cuisineString.slice(0, 30)}...`
      : cuisineString;
  };

  return (
    <div className="pr-8 pl-4 pb-6">
      <Link to={`/restaurants/${id}`}>
        <div className="w-[15rem] h-[20rem] rounded-lg overflow-hidden shadow-lg hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform">
          <div className="relative w-full h-40">
            <img
              className="w-full h-full object-cover rounded-t-lg"
              src={`${CON_URL}${cloudinaryImageId}`}
              alt={name}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B1E24] to-transparent p-3">
              <div className="text-white font-extrabold text-lg">{name}</div>
              <div className="text-sm text-gray-300">
                {renderDiscountInfo()}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-b-lg">
            <div className="font-bold text-lg text-gray-800">{name}</div>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                ></circle>
                <path
                  d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                  fill="white"
                ></path>
                <defs>
                  <linearGradient
                    id="StoreRating20_svg__paint0_linear_32982_71567"
                    x1="10"
                    y1="1"
                    x2="10"
                    y2="19"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#21973B"></stop>
                    <stop offset="1" stopColor="#128540"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span>
                {avgRating} • {deliveryTime} mins
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              {cuisines.length > 0 ? formatCuisines() : ""}
            </div>
            <div className="mt-1 text-sm text-gray-500">{areaName}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

//Higher Order Component
//input - RestroCard ==> RestroCardPromoted

export const withPromotedLabel = (RestroCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-gradient-to-r from-[#FF6347] via-[#FF4500] to-[#FF1493] text-white text-sm font-semibold px-[5px] py-[5px] rounded-full shadow-lg transform scale-90 hover:scale-100 hover:animate-pulse transition-all duration-300 ease-in-out z-10 m-0">
          Promoted
        </label>

        <RestroCard {...props} />
      </div>
    );
  };
};

export default RestroCard;
