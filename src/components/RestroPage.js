import React from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestroMenuItems from "./RestroMenuItems";

const RestroMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

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

  return (
    <div className="menu">
      <h1 className="font-bold">{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>

      <h2>Menu</h2>

      <ul>
        {itemCards.length === 0 ? (
          <Shimmer />
        ) : (
          itemCards.map((item) => (
            <RestroMenuItems menuItem={item} key={item.id} />
          ))
        )}
      </ul>
    </div>
  );
};

export default RestroMenu;
