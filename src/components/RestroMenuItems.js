import React, { useState } from "react";
import { CON_URL } from "../utils/constants";
import isVeg from "../../public/veg-icon.svg";
import isNonVeg from "../../public/non-veg-icon.svg";
import logo from "../../public/app_logo.png";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/slices/cartSlice";

const RestroMenuItems = ({ menuItem }) => {
  // console.log(menuItem);
  const [imageFailed, setImageFailed] = useState(false); // Initialize state to manage image failure
  const imgfilter = {
    filter: "grayscale(50%)",
  };

  //used for cartItem - Add button
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    //Dispatch an Action
    dispatch(addItems(item));
  };

  return (
    <div>
      {menuItem.map((item) => (
        <>
          <div
            key={item.card.info.id}
            className="p-2 m-2 text-left flex justify-between"
          >
            <div className="w-9/12">
              <div className="py-2">
                {item.card.info.isVeg ? (
                  <img src={isVeg} className="w-5 pb-1" />
                ) : (
                  <img src={isNonVeg} className="w-5 pb-1" />
                )}
                <span className="font-bold">{item.card.info.name}</span>
                <span>
                  - ₹
                  {item.card.info?.price / 100 ||
                    item.card.info?.variantsV2?.variantGroups[0]?.variations[1]
                      ?.price ||
                    item.card.info?.variantsV2?.pricingModels[0]?.price ||
                    item.card.info.defaultPrice / 100 ||
                    {}}
                </span>
              </div>
              <div>
                <p className="text-xs">{item.card.info.description}</p>
              </div>
            </div>
            <div className="3/12 flex align-bottom">
              <div className="">
                <button
                  className="p-2 z-10 font-bold text-green-500 bg-white shadow-lg rounded-lg absolute m-auto"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
                <img
                  className={`w-[130px] mr-5 rounded-lg ${
                    imageFailed ? `${imgfilter} grayscale` : ""
                  }`}
                  src={CON_URL + item.card.info.imageId}
                  onError={(e) => {
                    // console.log("Image failed to load, using fallback logo.");
                    e.currentTarget.src = logo; // Set to your logo URL
                    setImageFailed(true); // Correctly update the state using setImageFailed
                  }}
                  alt={item.card.info.name}
                />
              </div>
            </div>
          </div>

          <hr className="border border-[rgba(2,6,12,0.10)] my-3" />
        </>
      ))}
    </div>
  );
};

export const RestroMenuItemsInCart = (RestroMenuItems) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white z-10 m-1 p-1 rounded-md">
          Promoted
        </label>
        <RestroMenuItems {...props} />
      </div>
    );
  };
};

export default RestroMenuItems;
