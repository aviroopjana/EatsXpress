import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestaurantState {
  restaurant: Restaurant | null;
}

interface IMenuItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
}

interface Restaurant {
  _id: string;
  restaurantName: string;
  location: string;
  owner: string; 
  estimatedDeliveryTime: number;
  deliveryPrice: number;
  imageUrl: string;
  cuisines: string[];
  menu: IMenuItem[];
}

const initialState: RestaurantState = {
  restaurant: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurant = action.payload;
    },
  },
});

// Export actions and reducer
export const { setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
