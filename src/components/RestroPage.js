import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestroCategory from "./RestroCategory";

const RestroMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  if (!resInfo) return <Shimmer />;

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
    totalRatingsString,
  } = restaurantInfo || {};

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

  console.log(categories);

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-10">{name}</h1>
      <p className="font-bold">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>

      {categories.map((category, index) => (
        <RestroCategory
          categoryData={category?.card?.card}
          key={category?.card?.card.name}
          showItems={index === showIndex && true}
          setShowIndex={() => setShowIndex(index)}
          setShowItems={() => setShowIndex(false)}
        />
      ))}
    </div>
  );
};

export default RestroMenu;
