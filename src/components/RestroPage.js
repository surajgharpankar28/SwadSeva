import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@coreui/icons";
const RestroMenu = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

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
    <div className="w-12/12 text-center">
      <div className="w-11/12 sm:w-10/12 md:w-6/12 mx-auto my-4 bg-orange-400 shadow-lg rounded-xl overflow-hidden flex">
        <div className="flex-shrink-0 m-3">
          <img
            className="w-[10rem] h-[10rem] object-cover rounded-lg"
            src={`${CON_URL}${cloudinaryImageId}`}
            alt={name}
          />
        </div>
        <div className="flex-1 p-4 text-left">
          <h1 className="font-semibold text-2xl text-gray-800">{name}</h1>

          <div className="flex items-center mt-2 text-sm text-gray-700 mb-2">
            <span className="flex">
              <CIcon className="text-gray-800 w-[1rem] mr-1" icon={cilStar} />
              {avgRating} |{" "}
              <CIcon
                className="text-gray-800 w-[1rem] ml-1  mr-1"
                icon={cilAvTimer}
              />
              {deliveryTime} mins |
              <CIcon
                className="text-gray-800 w-[1rem] ml-1 mr-1"
                icon={cilMoney}
              />{" "}
              {costForTwoMessage}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1 flex">
            <CIcon className="text-gray-800 w-[1rem] mr-1" icon={cilFastfood} />
            {cuisines.join(", ")}
          </p>

          <div className="mt-1 text-sm flex">
            <CIcon className="text-gray-800 w-[1rem]" icon={cilLocationPin} />
            <span className=" text-gray-700">{areaName}</span>
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
    </div>
  );
};

export default RestroMenu;
