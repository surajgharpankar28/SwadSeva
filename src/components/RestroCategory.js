import React, { useState } from "react";
import RestroMenuItems from "./RestroMenuItems";
import { CIcon } from "@coreui/icons-react";
import { cilChevronCircleDownAlt, cilChevronCircleUpAlt } from "@coreui/icons";

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
  //console.log(categoryData);
  return (
    <div className="w-11/12 sm:w-10/12 md:w-6/12 mx-auto my-4 bg-white shadow-xl rounded-2xl overflow-hidden">
      {/* Category Header */}
      <div
        className="flex justify-between items-center p-3  cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out transform"
        onClick={handleClick}
      >
        <span className="font-semibold text-mg text-gray-800">
          {categoryData.title} ({categoryData.itemCards?.length})
        </span>
        <span className="text-2xl text-gray-600">
          {showItems ? (
            <CIcon
              className="text-gray-800 w-[1.5rem] mr-2"
              icon={cilChevronCircleUpAlt}
            />
          ) : (
            <CIcon
              className="text-gray-800 w-[1.5rem] mr-2"
              icon={cilChevronCircleDownAlt}
            />
          )}
        </span>{" "}
      </div>

      {/* Menu Items */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showItems ? "h-auto" : "h-0 overflow-hidden"
        }`}
      >
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
