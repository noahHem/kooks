import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/Ingredient';
import { recipeApi } from '../api/recipeApi';

interface IngredientsState {
  ingredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      recipeApi.endpoints.listIngredients.matchFulfilled,
      (state, action) => {
        state.ingredients = action.payload.meals;
      }
    );
  },
});

export const {
  setIngredients
 } = ingredientsSlice.actions;
export default ingredientsSlice.reducer; 