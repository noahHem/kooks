import { configureStore } from '@reduxjs/toolkit';
import { recipeApi } from '../api/recipeApi';
import ingredientsReducer from '../slices/ingredientsSlice';
import mealReducer from '../slices/mealSlice';
import appReducer from '../slices/appSlice';
import favoritesReducer from '../slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    meals: mealReducer,
    app: appReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
