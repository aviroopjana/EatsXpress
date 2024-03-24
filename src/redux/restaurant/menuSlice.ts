import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  menuItems: IMenuItem[];
}

interface IMenuItem {
    productId: string;
    name: string;
    description?: string;
    price: number;
}

const initialState: MenuState = {
  menuItems: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<IMenuItem>) => {
      state.menuItems.push(action.payload);
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.menuItems = state.menuItems.filter(item => item.productId !== action.payload);
    },
  },
});

export const { addMenuItem, removeMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
