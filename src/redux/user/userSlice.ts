import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  currentUser: currentUserType | null;
  error: string | null;
  loading: boolean;
}

export interface currentUserType {
  _id: string;
  username: string;
  email: string;
  name: string;
  profilePicture: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: userState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<currentUserType>) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action: PayloadAction<currentUserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  updateSuccess,
  updateFailure,
  updateStart,
} = userSlice.actions;

export default userSlice.reducer;
