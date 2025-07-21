import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '../types/Meal';

interface FavoritesState {
  favorites: Meal[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const loadFavorites = createAsyncThunk('favorites/load', async () => {
  const data = await AsyncStorage.getItem('@favorites');
  if (data) {
    return JSON.parse(data) as Meal[];
  }
  return [];
});

export const saveFavorites = createAsyncThunk('favorites/save', async (favorites: Meal[]) => {
  await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Meal[]>) {
      state.favorites = action.payload;
    },
    addFavorite(state, action: PayloadAction<Meal>) {
      if (!state.favorites.find(m => m.idMeal === action.payload.idMeal)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(m => m.idMeal !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer; 