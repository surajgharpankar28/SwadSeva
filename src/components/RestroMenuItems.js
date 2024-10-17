import React from "react";

const RestroMenuItems = ({ menuItem }) => {
  const price =
    menuItem.card.info.price / 100 ||
    menuItem.card.info.variantsV2?.variantGroups[0]?.variations[1]?.price ||
    menuItem.card.info.variantsV2?.pricingModels[0]?.price;

  return (
    <li key={menuItem.card.info.id}>
      {menuItem.card.info.name} - {price}
    </li>
  );
};

export default RestroMenuItems;
