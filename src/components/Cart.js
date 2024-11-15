import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RestroMenuItems from "./RestroMenuItems";
import { clearCart } from "../utils/slices/cartSlice";
import { Link } from "react-router-dom";

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
      return total + (item.card.info?.price / 100 || 0);
    }, 0);
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold text-2xl">My Cart</h1>
      <div className="w-6/12 mx-auto my-4 bg-gray-200 shadow-lg p-4 text-left border rounded-2xl">
        {/* Show Clear Cart button or empty cart message */}
        {cartItems.length > 0 ? (
          <button
            className="p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        ) : (
          <h3>
            Your cart is empty. Go to{" "}
            <Link className="text-blue-800 font-bold" to="/">
              Home
            </Link>{" "}
            to add items.
          </h3>
        )}

        {/* List of Cart Items */}
        {cartItems.length > 0 && (
          <>
            <RestroMenuItems menuItem={cartItems} key={cartItems} />

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
