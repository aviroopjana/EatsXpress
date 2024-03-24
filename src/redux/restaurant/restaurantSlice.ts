import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestaurantState {
  restaurant: Restaurant | null;
  loading: boolean;
  success: boolean;
  error: string | null;
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
  loading: false,
  success: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurantStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setRestaurantSuccess: (state, action: PayloadAction<Restaurant>) => {
      state.restaurant = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setRestaurantFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  setRestaurantStart,
  setRestaurantSuccess,
  setRestaurantFailure
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
