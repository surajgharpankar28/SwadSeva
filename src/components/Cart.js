import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/slices/cartSlice";
import { Link } from "react-router-dom";
import CartItems from "./CardItems";
import { CIcon } from "@coreui/icons-react";
import { cilCart, cilHome } from "@coreui/icons";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items); // Get cart items from Redux store
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
        (item.card.info?.price / 100 || item.card.info.defaultPrice / 100 || 0)
      );
    }, 0);
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold text-2xl">My Cart</h1>
      <div className="w-6/12 mx-auto my-4 bg-gray-200 shadow-lg p-4 text-left border rounded-2xl">
        {/* Show Clear Cart button or empty cart message */}
        {cartItems.length > 0 ? (
          <div className="flex justify-end">
            <button
              className="p-2 m-2 bg-orange-400 text-black rounded-lg "
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
        ) : (
          <>
            <div className="text-center  ">
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
            <CartItems menuItem={cartItems} key={cartItems} />

            {/* Total Price Display */}
            <div className="text-right mt-4">
              <span className="text-xl font-bold">
                Total: ₹{" "}
                {new Intl.NumberFormat("en-IN").format(
                  Math.round(calculateTotalPrice())
                )}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
