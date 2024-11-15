import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      //modifying the state directly here
      const newItem = { ...action.payload, uniqueId: uuidv4() }; // Add a uniqueId
      state.items.push(newItem);
    },

    // addItems: (state, action) => {
    //   const newItem = action.payload; // Use the entire payload as newItem
    //   const existingItem = state.items.find(
    //     (item) => item.card.info.id === newItem.card.info.id // Check for existing item
    //   );

    //   if (existingItem) {
    //     // If item exists, increment its quantity
    //     existingItem.quantity = (existingItem.quantity || 1) + 1;
    //     console.log(existingItem.quantity);
    //   } else {
    //     // If item is new, add it to the cart with quantity 1
    //     state.items.push({ ...newItem, quantity: 1 });
    //   }
    // },
    removeItem: (state, action) => {
      // console.log("State items before removal:", state.items);
      // console.log("Unique ID to remove:", action.payload);
      state.items = state.items.filter(
        (item) => item.uniqueId !== action.payload
      );
      // console.log("State items after removal:", state.items);
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
