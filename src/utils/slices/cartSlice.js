import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      //modifying the state directly here
      state.items.push(action.payload);
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
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
