import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CuisineState {
  selectedCuisines: string[];
}

const initialState: CuisineState = {
  selectedCuisines: [],
};

const cuisineSlice = createSlice({
  name: 'cuisine',
  initialState,
  reducers: {
    selectCuisine(state, action: PayloadAction<string[]>) {
      const cuisines = action.payload;
      cuisines.forEach(cuisine => {
        if (!state.selectedCuisines.includes(cuisine)) {
          state.selectedCuisines.push(cuisine);
        }
      });
    },
    deselectCuisine(state, action: PayloadAction<string>) {
      const cuisine = action.payload;
      state.selectedCuisines = state.selectedCuisines.filter(item => item !== cuisine);
    },
    clearCuisines(state) {
      state.selectedCuisines = [];
    },
  },
});

export const { selectCuisine, deselectCuisine, clearCuisines } = cuisineSlice.actions;

export default cuisineSlice.reducer;
