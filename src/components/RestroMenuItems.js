import React from "react";
import { CON_URL } from "../utils/constants";
import isVeg from "../../public/veg-icon.svg";
import isNonVeg from "../../public/non-veg-icon.svg";
const RestroMenuItems = ({ menuItem }) => {
  // console.log(menuItem);

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
                <button className="p-2 font-bold text-green-500 bg-white shadow-lg rounded-lg absolute m-auto">
                  ADD
                </button>
                <img
                  className="w-[130px] mr-5 rounded-lg"
                  src={CON_URL + item.card.info.imageId}
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

export default RestroMenuItems;
