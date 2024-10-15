import React from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";

const RestroMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  let itemCards;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i]?.card?.card?.itemCards) {
      itemCards = cards[i]?.card?.card?.itemCards;
      console.log(`Cards found at : Card[` + i + "]");
      break;
    }
  }

  if (!itemCards) {
    console.log("itemCards are not defined in any card");
  }

  if (resInfo === null) return <Shimmer />;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} -{" "}
            {item.card.info.price / 100 ||
              item.card.info.variantsV2.variantGroups[0].variations[1].price ||
              item.card.info.variantsV2.pricingModels[0].price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestroMenu;
