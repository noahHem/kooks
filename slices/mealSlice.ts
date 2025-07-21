import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/Ingredient';
import { recipeApi } from '../api/recipeApi';
import { Meal } from '../types/Meal';

interface MealState {
  meals: Meal[];
  meal: Meal|null;
}

const initialState: MealState = {
  meals: [],
  meal: null
};

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals(state, action) {
      state.meals = action.payload;
    },
    setMeal(state, action) {
      state.meal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      recipeApi.endpoints.getMealsByIngredient.matchFulfilled,
      (state, action) => {
        state.meals = action.payload.meals;
      }
    );
    builder.addMatcher(
      recipeApi.endpoints.getMealById.matchFulfilled,
      (state, action) => {
        state.meal = action.payload.meals[0];
      }
    );
  },
});

export const {
  setMeals,
  setMeal
} = mealSlice.actions;
export default mealSlice.reducer; 