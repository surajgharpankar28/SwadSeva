import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const { uniqueId, quantity = 1 } = action.payload; // Assuming each item has a unique `uniqueId`

      // Find the existing item by its uniqueId
      const existingItem = state.items.find(
        (item) => item.uniqueId === uniqueId
      );

      if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the item doesn't exist, add it with the specified quantity
        const newItem = {
          ...action.payload,
          uniqueId: uuidv4(), // Add a unique ID if it's a new item
          quantity: quantity, // Add a quantity
        };
        state.items.push(newItem);
      }
    },

    // updateItemQuantity: (state, action) => {
    //   const { id, increment } = action.payload;

    //   // Iterate through the array of items to find the correct entry
    //   const parentItem = state.items.find((parent) =>
    //     parent.some((child) => child.card?.info?.id === id)
    //   );

    //   if (parentItem) {
    //     // Find the specific child item and update its quantity
    //     const childItem = parentItem.find(
    //       (child) => child.card?.info?.id === id
    //     );

    //     if (childItem) {
    //       // Increment or decrement quantity
    //       childItem.quantity = (childItem.quantity || 1) + (increment ? 1 : -1);

    //       // Remove the child item if quantity is 0 or less
    //       if (childItem.quantity <= 0) {
    //         parentItem.splice(parentItem.indexOf(childItem), 1);

    //         // If the parent array becomes empty, remove it from the state
    //         if (parentItem.length === 0) {
    //           state.items = state.items.filter((item) => item !== parentItem);
    //         }
    //       }
    //     }
    //   }
    // },

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
      const { uniqueId } = action.payload;

      const existingItem = state.items.find(
        (item) => item.uniqueId === uniqueId
      );

      if (existingItem) {
        // Decrement the quantity
        existingItem.quantity -= 1;

        // If the quantity becomes 0, remove the item from the cart
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.uniqueId !== uniqueId
          );
        }
      }
    },

    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, clearCart, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
