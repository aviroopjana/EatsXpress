import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone: '',
  addressLine1: '',
  city: '',
  pincode: '',
};

const checkoutFormSlice = createSlice({
  name: 'checkoutForm',
  initialState,
  reducers: {
    setForm: (_, action) => {
      return action.payload;
    },
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setForm, updateForm } = checkoutFormSlice.actions;

export default checkoutFormSlice.reducer;