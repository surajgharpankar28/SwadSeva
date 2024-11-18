import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
          info: {
            id: "100395543",
            name: "Plain Masala Dosa",
            category: "Dosas",
            imageId:
              "FOOD_CATALOG/IMAGES/CMS/2024/9/28/0b4efa53-93ab-4ee2-8a2f-4f9b454a6f2d_2f5c64e6-45dc-4798-9dfb-af3b14bf6f73.jpeg",
            inStock: 1,
            isVeg: 1,
            price: 12000,
            variants: {},
            variantsV2: {},
            itemAttribute: {
              vegClassifier: "VEG",
            },
            ribbon: {
              text: "Bestseller",
              textColor: "#ffffff",
              topBackgroundColor: "#d53d4c",
              bottomBackgroundColor: "#b02331",
            },
            type: "ITEM",
            itemBadge: {},
            badgesV2: {},
            isBestseller: true,
            ratings: {
              aggregatedRating: {
                rating: "4.1",
                ratingCount: "59 ratings",
                ratingCountV2: "59",
              },
            },
          },
          analytics: {},
          hideRestaurantDetails: true,
        },
        uniqueId: "7574cb4f-3ffa-4599-8605-256463caf8f5",
        quantity: 1,
      },
      {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
          info: {
            id: "30199766",
            name: "Loni Dosa",
            category: "Special Dosa",
            description:
              "Thin and crispy dosa with a savory filling, perfect for breakfast or anytime.",
            imageId: "xndoyviaajpku99ohjpc",
            inStock: 1,
            isVeg: 1,
            price: 8500,
            variants: {},
            variantsV2: {},
            itemAttribute: {
              vegClassifier: "VEG",
            },
            ribbon: {
              text: "Bestseller",
              textColor: "#ffffff",
              topBackgroundColor: "#d53d4c",
              bottomBackgroundColor: "#b02331",
            },
            showImage: true,
            itemBadge: {},
            badgesV2: {},
            isBestseller: true,
            ratings: {
              aggregatedRating: {
                rating: "4.5",
                ratingCount: "1846 ratings",
                ratingCountV2: "1846",
              },
            },
          },
          analytics: {},
          hideRestaurantDetails: true,
        },
        uniqueId: "7d863ce0-b786-404b-9993-eca4faff1713",
        quantity: 1,
      },
      {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
          info: {
            id: "30199768",
            name: "Sponge Loni Dosa",
            category: "Special Dosa",
            description:
              "A delectable and unique delight that embraces the flavors of vegetables and spices, perfect to tantalize your taste buds.",
            imageId: "enizzhn1wy0cf60e3l0p",
            inStock: 1,
            isVeg: 1,
            price: 11000,
            variants: {},
            variantsV2: {},
            itemAttribute: {
              vegClassifier: "VEG",
            },
            ribbon: {
              text: "Bestseller",
              textColor: "#ffffff",
              topBackgroundColor: "#d53d4c",
              bottomBackgroundColor: "#b02331",
            },
            showImage: true,
            itemBadge: {},
            badgesV2: {},
            isBestseller: true,
            ratings: {
              aggregatedRating: {
                rating: "4.5",
                ratingCount: "488 ratings",
                ratingCountV2: "488",
              },
            },
          },
          analytics: {},
          hideRestaurantDetails: true,
        },
        uniqueId: "0437edbb-a22b-4127-aa90-ec1332f61f8f",
        quantity: 1,
      },
    ],
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
