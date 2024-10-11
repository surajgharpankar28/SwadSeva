import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestroMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();
  console.log("ResID : " + resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    console.log("API Link = " + MENU_API + resId);
    const data = await fetch(MENU_API + resId);
    const json = await data.json();

    console.log(json);
    setResInfo(json.data);
  };

  const [currCard, setCurrCard] = useState(0);
  console.log("Current Card - " + currCard);
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[currCard].card
      ?.card || {};

  if (itemCards === undefined) {
    console.log("itemCards are not defined");
    if (
      currCard <
      resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.card?.length - 1
    ) {
      // Use functional setState to ensure the latest value of currCard is used
      setCurrCard(2);
      console.log("1234567890afsdjvfsdbj");
    } else {
      console.log("Reached the end of cards, stopping.");
      // Handle the case when no more cards exist.
    }
  } else {
    console.log("itemCards are defined");
  }

  console.log("Cuisines : " + cuisines);

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
