import React, { useState } from "react";
import { CON_URL } from "../utils/constants";
import isVeg from "../../public/veg-icon.svg";
import isNonVeg from "../../public/non-veg-icon.svg";
import logo from "../../public/app_logo.png";
import { useDispatch } from "react-redux";
import { addItems, removeItem } from "../utils/slices/cartSlice";
import { CIcon } from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";

const RestroMenuItems = ({ menuItem, index }) => {
  // console.log(menuItem);
  const [imageFailed, setImageFailed] = useState(false); // Initialize state to manage image failure
  const imgfilter = {
    filter: "grayscale(50%)",
  };

  //used for cartItem - Add button
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    // Dispatch the action with the uniqueId and a quantity of 1 (since you're adding one item)
    dispatch(addItems({ uniqueId: item.uniqueId, ...item, quantity: 1 }));
  };
  const handleRemoveItem = (item) => {
    //Dispatch an Action
    dispatch(removeItem(item.uniqueId));
  };

  return (
    <div>
      {menuItem.map((item) => (
        <div
          key={item.card.info.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4"
        >
          {/* Left Section: Item Info */}
          <div className="flex-1 pr-4">
            {/* Veg/Non-Veg Icon */}
            <div className="flex align-middle">
              <img
                src={item.card.info.isVeg ? isVeg : isNonVeg}
                className="w-6 h-6 mr-1"
                alt={item.card.info.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              />

              {item.card.info.ribbon.text === "Bestseller" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 16"
                    width="74"
                    height="16"
                  >
                    <path
                      d="M15.022 11V1.2h4.032c.999 0 1.769.21 2.31.63.55.42.826 1.008.826 1.764 0 .476-.13.896-.392 1.26-.252.355-.574.63-.966.826 1.176.467 1.764 1.26 1.764 2.38 0 .896-.336 1.61-1.008 2.142-.663.532-1.484.798-2.464.798h-4.102Zm1.848-4.368v2.716h2.142c1.157 0 1.736-.453 1.736-1.358s-.579-1.358-1.736-1.358H16.87Zm0-3.808v2.184h2.044c.513 0 .887-.089 1.12-.266.243-.177.364-.453.364-.826 0-.373-.121-.649-.364-.826-.233-.177-.607-.266-1.12-.266H16.87Zm13.226 5.124h-5.348c.056.532.257.957.602 1.274.346.308.78.462 1.302.462.86 0 1.498-.425 1.918-1.274l1.317.756c-.654 1.353-1.741 2.03-3.262 2.03-.99 0-1.834-.34-2.535-1.022-.69-.69-1.035-1.573-1.035-2.646 0-1.083.35-1.965 1.05-2.646.709-.681 1.577-1.022 2.604-1.022.989 0 1.8.327 2.436.98.634.644.951 1.475.951 2.492v.616Zm-3.444-2.744c-.457 0-.858.14-1.204.42a2.1 2.1 0 0 0-.7 1.036h3.724c-.084-.457-.284-.812-.602-1.064-.317-.261-.723-.392-1.218-.392Zm5.807.56c0 .43.546.756 1.638.98.813.168 1.4.425 1.764.77.374.336.56.793.56 1.372 0 .672-.247 1.227-.742 1.666-.494.43-1.162.644-2.002.644-.802 0-1.47-.196-2.002-.588A3.638 3.638 0 0 1 30.5 9.11l1.413-.896c.16.457.388.821.686 1.092.309.27.677.406 1.107.406.289 0 .54-.065.755-.196.224-.14.337-.331.337-.574 0-.224-.117-.401-.35-.532-.234-.14-.612-.261-1.135-.364-1.614-.317-2.422-1.04-2.422-2.17 0-.625.253-1.115.757-1.47.503-.364 1.115-.546 1.833-.546.738 0 1.326.14 1.764.42.449.28.817.723 1.107 1.33l-1.274.756c-.318-.812-.84-1.218-1.569-1.218-.7 0-1.05.205-1.05.616Zm4.18-.28V4.056h1.078V2.18h1.764v1.876h1.512v1.428H39.48v3.164c0 .653.294.98.882.98.205 0 .401-.028.588-.084L41.119 11c-.355.13-.747.196-1.176.196-1.484 0-2.226-.737-2.226-2.212v-3.5h-1.078Zm6.81.28c0 .43.547.756 1.639.98.812.168 1.4.425 1.764.77.373.336.56.793.56 1.372 0 .672-.248 1.227-.742 1.666-.495.43-1.162.644-2.002.644-.803 0-1.47-.196-2.002-.588A3.638 3.638 0 0 1 41.49 9.11l1.414-.896c.158.457.387.821.686 1.092.308.27.676.406 1.106.406.289 0 .541-.065.756-.196.224-.14.336-.331.336-.574 0-.224-.117-.401-.35-.532-.234-.14-.612-.261-1.134-.364-1.615-.317-2.422-1.04-2.422-2.17 0-.625.252-1.115.756-1.47.504-.364 1.115-.546 1.834-.546.737 0 1.325.14 1.764.42.448.28.816.723 1.106 1.33l-1.274.756c-.318-.812-.84-1.218-1.568-1.218-.7 0-1.05.205-1.05.616Zm11.485 2.184h-5.348c.056.532.257.957.602 1.274.346.308.78.462 1.302.462.859 0 1.498-.425 1.918-1.274l1.316.756c-.653 1.353-1.74 2.03-3.262 2.03-.989 0-1.834-.34-2.534-1.022-.69-.69-1.036-1.573-1.036-2.646 0-1.083.35-1.965 1.05-2.646.71-.681 1.578-1.022 2.604-1.022.99 0 1.802.327 2.436.98.635.644.952 1.475.952 2.492v.616ZM51.49 5.204c-.457 0-.858.14-1.204.42-.336.27-.569.616-.7 1.036h3.724c-.084-.457-.284-.812-.602-1.064-.317-.261-.723-.392-1.218-.392ZM55.837 11V1.2h1.764V11h-1.764Zm3.027 0V1.2h1.764V11h-1.764Zm9.678-3.052h-5.348c.056.532.256.957.602 1.274.345.308.78.462 1.302.462.858 0 1.498-.425 1.918-1.274l1.316.756c-.654 1.353-1.74 2.03-3.262 2.03-.99 0-1.834-.34-2.534-1.022-.69-.69-1.036-1.573-1.036-2.646 0-1.083.35-1.965 1.05-2.646.71-.681 1.577-1.022 2.604-1.022.99 0 1.801.327 2.436.98.634.644.952 1.475.952 2.492v.616Zm-3.444-2.744c-.458 0-.859.14-1.204.42a2.1 2.1 0 0 0-.7 1.036h3.724c-.084-.457-.285-.812-.602-1.064-.318-.261-.724-.392-1.218-.392Zm8.645-1.26-.28 1.666a1.648 1.648 0 0 0-.575-.098c-.513 0-.924.196-1.232.588-.298.383-.448.873-.448 1.47V11h-1.763V4.056h1.764v1.106c.429-.868 1.073-1.302 1.931-1.302.215 0 .416.028.603.084Z"
                      fill="#FF6E5A"
                    />
                    <path
                      d="M7.5 14.5H23M1 5.996h4.202L6.5 2l1.298 3.996H12l-3.4 2.47 1.3 3.996-3.4-2.47S4.335 11.32 4 12c-.335.68-.763 2.5 3.798 2.5"
                      stroke="#FF6E5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">
                {item.card.info.name}
              </span>
            </div>

            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xl font-bold text-black-600">
                ₹
                {new Intl.NumberFormat("en-IN").format(
                  Math.round(
                    item.card.info?.price / 100 ||
                      item.card.info?.variantsV2?.variantGroups[0]
                        ?.variations[1]?.price / 100 ||
                      item.card.info?.variantsV2?.pricingModels[0]?.price /
                        100 ||
                      item.card.info.defaultPrice / 100
                  )
                )}
              </span>
            </div>
            <div className="text-left text-sm pt-2">
              <p className="pb-2">
                {item.card.info.ratings.aggregatedRating.rating && (
                  <span className="text-green-700">
                    <span className="text-lg">✮</span>
                    {item.card.info.ratings.aggregatedRating.rating}{" "}
                  </span>
                )}
                {item.card.info.ratings.aggregatedRating.ratingCountV2 && (
                  <span className="text-sm text-gray-500">
                    ({item.card.info.ratings.aggregatedRating.ratingCountV2})
                  </span>
                )}
              </p>
              <p className="text-md text-gray-600 mt-2 ">
                {item.card.info.description}
              </p>
            </div>
          </div>

          {/* Right Section: Image and Add to Cart Button */}
          <div className="relative flex justify-end items-center">
            <img
              className={`w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md ${
                imageFailed ? "grayscale" : ""
              }`}
              src={CON_URL + item.card.info.imageId}
              alt={item.card.info.name}
              onError={(e) => {
                e.currentTarget.src = logo;
                setImageFailed(true);
              }}
            />
            <button
              className="absolute bottom-0 left-0 w-full bg-orange-500 text-white font-semibold text-lg flex justify-center items-center rounded-b-lg hover:bg-orange-400 transition-all duration-300"
              onClick={() => handleAddItem(item)}
            >
              <CIcon className="text-black w-[1.2rem] my-1" icon={cilCart} />{" "}
            </button>
          </div>
        </div>
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
