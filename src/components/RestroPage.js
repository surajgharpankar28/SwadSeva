import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoFoodIcon from "/public/no-food.png";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { MenuShimmer } from "./Shimmer";
import RestroCategory from "./RestroCategory";
import { CON_URL } from "../utils/constants";
import { CIcon } from "@coreui/icons-react";
import {
  cilLocationPin,
  cilStar,
  cilAvTimer,
  cilMoney,
  cilFastfood,
  cilArrowCircleRight,
} from "@coreui/icons";
import { useSelector } from "react-redux";

const RestroMenu = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const cartItemsQuantity = cartItems.reduce((totalQuantity, item) => {
    return totalQuantity + (item.quantity || 0); // Add each item's quantity to the total
  }, 0);

  if (!resInfo) return <MenuShimmer />;

  // Destructure only if the restaurant ID matches
  const restaurantInfo = resInfo?.cards[2]?.card?.card?.info;

  if (restaurantInfo?.id !== resId) {
    return <div>Restaurant not found.</div>; // Handle case where restaurant ID doesn't match
  }

  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    avgRating,
    cloudinaryImageId,
    totalRatingsString,
  } = restaurantInfo || {};

  const { deliveryTime } = restaurantInfo.sla || {};

  const cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // Using find to get the first itemCards if available
  const itemCards =
    cards.find((card) => card?.card?.card?.itemCards)?.card.card.itemCards ||
    [];

  const offerCards =
    resInfo.cards[3].card.card.gridElements.infoWithStyle.offers[0].info;

  // Log if itemCards are not found
  if (!itemCards.length) {
    console.log("itemCards are not defined in any card");
  }
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  // console.log(categories);

  return (
    <div className="w-12/12">
      <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-4 bg-orange-400 shadow-lg rounded-xl overflow-hidden flex flex-row">
        <div className="flex-shrink-0 m-3">
          <img
            className="w-[10rem] h-[10rem] object-cover rounded-lg"
            src={`${CON_URL}${cloudinaryImageId}`}
            alt={name}
          />
        </div>
        <div className="flex-1  p-4 text-left">
          <h1 className="font-semibold text-2xl text-gray-800">{name}</h1>
          <div class="flex items-center mt-2 text-sm text-gray-700  flex-wrap sm:flex-nowrap">
            <span class="flex items-center pr-2">
              <CIcon className="text-gray-800 w-[1rem] mr-1" icon={cilStar} />
              {avgRating} stars
            </span>
            <span class="flex items-center pr-2">
              <CIcon
                className="text-gray-800 w-[1rem] ml-1 mr-1"
                icon={cilAvTimer}
              />
              {deliveryTime} mins
            </span>
            <span class="flex items-center">
              <CIcon className="text-gray-800 w-[1rem] mr-1" icon={cilMoney} />
              {costForTwoMessage}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1 flex items-start ">
            <CIcon className="text-gray-800 w-[1rem] mr-1" icon={cilFastfood} />
            {cuisines.join(", ")}
          </p>

          <div className="mt-1 text-sm flex items-start">
            <CIcon
              className="text-gray-800 w-[1rem] mr-1"
              icon={cilLocationPin}
            />
            <span className="text-gray-700">{areaName}</span>
          </div>
        </div>
      </div>

      {categories.length > 0 ? (
        categories.map((category, index) => (
          <RestroCategory
            categoryData={category?.card?.card}
            key={category?.card?.card.name}
            showItems={index === showIndex && true}
            setShowIndex={() => setShowIndex(index)}
            setShowItems={() => setShowIndex(false)}
          />
        ))
      ) : (
        <>
          <div className="h-[100%] m-auto flex justify-center">
            <img
              className="w-[20rem] rounded-[2rem]"
              src={NoFoodIcon}
              alt="App Logo"
            />
          </div>
          <div className="flex justify-center items-center">
            <h3 className="font-semibold mt-2 text-md text-center">
              No options available
            </h3>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="flex justify-center items-center w-full pb-2 bottom-0 sticky block sm:hidden">
          <button className="flex justify-between text-white w-[80%] px-4 py-2 h-8 bg-orange-500 font-semibold rounded-lg text-center justify-center items-center">
            <span className="font-semibold px-2 ml-1">
              {cartItemsQuantity} item added
            </span>
            <Link to="/cart" className="flex">
              <span className="flex font-semibold underline underline-offset-2">
                View Cart{" "}
                <CIcon
                  className="text-white w-[1.1rem] ml-2 hover:text-orange-500"
                  icon={cilArrowCircleRight}
                />
              </span>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default RestroMenu;
