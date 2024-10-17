import React from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";

const RestroMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // Using find to get the first itemCards if available
  const itemCards =
    cards.find((card) => card?.card?.card?.itemCards)?.card.card.itemCards ||
    [];

  // Log if itemCards are not found
  if (!itemCards.length) {
    console.log("itemCards are not defined in any card");
  }

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => {
          const price =
            item.card.info.price / 100 ||
            item.card.info.variantsV2?.variantGroups[0]?.variations[1]?.price ||
            item.card.info.variantsV2?.pricingModels[0]?.price;

          return (
            <li key={item.card.info.id}>
              {item.card.info.name} - {price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestroMenu;
