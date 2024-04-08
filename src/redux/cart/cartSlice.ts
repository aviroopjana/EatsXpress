import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartItem } from '@/pages/DetailsPage';

type CartState = {
  items: cartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<cartItem>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
        state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;