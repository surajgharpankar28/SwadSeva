import React, { useState } from "react";
import RestroMenuItems from "./RestroMenuItems";

const RestroCategory = ({
  categoryData,
  showItems,
  setShowIndex,
  setShowItems,
}) => {
  const handleClick = () => {
    setShowIndex();
    if (showItems == true) setShowItems();
  };
  console.log(categoryData);
  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-200 shadow-lg p-4 text-left border rounded-2xl">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold">
          {categoryData.title} ({categoryData.itemCards?.length})
        </span>
        <span className="text-lg">↓</span>
      </div>
      <div>
        {showItems && (
          <RestroMenuItems
            menuItem={categoryData.itemCards}
            key={categoryData.itemCards.title}
          />
        )}
      </div>
    </div>
  );
};

export default RestroCategory;
