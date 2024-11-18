import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/slices/cartSlice";
import { Link } from "react-router-dom";
import CartItems from "./CardItems";
import { CIcon } from "@coreui/icons-react";
import { cilCart, cilHome } from "@coreui/icons";
import Contact from "./Contact";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items); // Get cart items from Redux store
  const cartItemsQuantity = cartItems.reduce((totalQuantity, item) => {
    return totalQuantity + (item.quantity || 0); // Add each item's quantity to the total
  }, 0);
  console.log(cartItems);
  console.log(cartItemsQuantity);
  const dispatch = useDispatch();

  // Handler to clear the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        (item.card.info?.price / 100 ||
          item.card.info?.variantsV2?.pricingModels[0]?.price / 100 ||
          item.card.info.defaultPrice / 100 ||
          0) *
          item.quantity
      );
    }, 0);
  };

  const itemPrice = Math.round(calculateTotalPrice());
  const deliveryFee = itemPrice > 300 ? 0 : 20;
  const availFreeDelivery = 300 - itemPrice;
  const discount = 30;
  const platformFee = 6;
  const GST = Math.round(itemPrice * 0.18);

  const toPay = new Intl.NumberFormat("en-IN").format(
    Math.round(itemPrice + deliveryFee + platformFee + itemPrice * 0.18 - 30)
  );

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold text-2xl">My Cart</h1>
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-10/12 mx-auto my-4 bg-gray-100 shadow-lg p-4 text-left border rounded-2xl">
        {/* Show Clear Cart button or empty cart message */}
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col mb-4 py-2">
              <span className="text-lg font-semibold">Delivery Address:</span>
              <span className="text-md">Suraj Gharpankar</span>
              <span className="text-md">
                Plot 28, Block 05, Rajarampuri, Kolhapur{" "}
              </span>
              <span className="text-md">416013</span>
            </div>
            <div className="flex justify-start">
              <button
                className="p-2 mb-2 bg-orange-400 text-black rounded-lg"
                onClick={handleClearCart}
              >
                <span className="flex">
                  Clear
                  <CIcon
                    className="text-black w-[1.2rem] my-1 mx-2"
                    icon={cilCart}
                  />
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h3 className="flex justify-center font-semibold text-lg items-center mb-2">
                Your cart is empty.
              </h3>
              <div className="flex justify-center items-center">
                <CIcon
                  className="text-black w-[15rem] h-[15rem]"
                  icon={cilCart}
                />
              </div>
            </div>
          </>
        )}

        {/* List of Cart Items */}
        {cartItems.length > 0 && (
          <>
            <div className="flex flex-wrap md:flex-nowrap">
              <div className="w-full md:w-9/12">
                <CartItems menuItem={cartItems} key={cartItems} />
              </div>
              {/* Total Price Display */}
              <div className="w-full md:w-3/12 text-right mt-4 md:mt-0">
                <span className="text-left font-semibold flex px-5 text-md mb-3">
                  Bill Details
                </span>
                <div className="flex justify-between px-5 text-gray-700 mb-2">
                  <span className="text-sm">
                    Total Items ({cartItemsQuantity}):
                  </span>
                  <span className="text-sm">₹{itemPrice}</span>
                </div>
                <div className="flex justify-between px-5 text-gray-700 mb-2">
                  {itemPrice < 300 ? (
                    <>
                      <span className="text-sm"> Delivery Fee :</span>
                      <span className="text-sm">₹{deliveryFee}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm"> Delivery Fee :</span>
                      <span className="text-sm">
                        <span className="text-green-600 font-bold pl-1">
                          Free
                        </span>
                      </span>
                    </>
                  )}
                </div>
                {itemPrice < 300 && (
                  <div className="w-full flex justify-start pl-5 text-left text-gray-700 mb-2">
                    <span className="text-xs text-gray-500">
                      Add ₹{availFreeDelivery} worth of items to avail free
                      delivery.
                    </span>
                  </div>
                )}
                <div className="flex justify-between px-5 text-gray-700 mb-2">
                  <span className="text-sm"> Extra discount for you :</span>
                  <span className="text-sm">-₹{discount}</span>
                </div>
                <div className="relative py-4">
                  <div className="absolute inset-0 top-1/2 mx-[calc(10%+5px)]">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
                  </div>
                </div>
                <div className="flex justify-between px-5 text-gray-700 mb-2">
                  <span className="text-sm"> Platform fee :</span>
                  <span className="text-sm">₹{platformFee}</span>
                </div>
                <div className="flex justify-between px-5 text-gray-700 mb-2">
                  <span className="text-sm"> GST and Restaurant Charges </span>
                  <span className="text-sm">₹{GST}</span>
                </div>
                <div className="relative py-4">
                  <div className="absolute inset-0 top-1/2 mx-[calc(10%+5px)]">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
                  </div>
                </div>
                <div className="flex justify-between px-5 font-semibold text-black">
                  <span className="text-sm"> TO PAY </span>
                  <span className="text-sm">₹{toPay}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
