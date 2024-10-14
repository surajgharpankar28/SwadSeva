import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestroMenu = () => {
  const { resId } = useParams(); //hook
  const resInfo = useRestaurantMenu(resId); //custom hook

  console.log("resId : " + resId);
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  let itemCards;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i]?.card?.card?.itemCards) {
      itemCards = cards[i].card.card.itemCards;
      console.log("At Card - " + i);
      break;
    }
  }

  if (!itemCards) {
    console.log("itemCards are not defined in any card");
  }

  // console.log("Cuisines : " + cuisines);

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
              item.card.info.variantsV2.variantGroups[0].variations[1].price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestroMenu;
