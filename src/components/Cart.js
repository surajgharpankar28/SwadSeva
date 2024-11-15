import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RestroMenuItems, { RestroMenuItemsInCart } from "./RestroMenuItems";
import { clearCart } from "../utils/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  //used for cartItem - Add button
  const dispatch = useDispatch();
  const handleClearCart = () => {
    //Dispatch an Action
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold">My Cart</h1>
      <div className="w-6/12 mx-auto my-4 bg-gray-200 shadow-lg p-4 text-left border rounded-2xl">
        {cartItems.length > 0 ? (
          <button
            className="p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        ) : (
          <h3>Your cart is empty</h3>
        )}

        <RestroMenuItems menuItem={cartItems} key={cartItems}></RestroMenuItems>
      </div>
    </div>
  );
};

export default Cart;
