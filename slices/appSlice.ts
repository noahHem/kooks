import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  modal: string|null;
}

const initialState: AppState = {
    modal: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setModal(state, action) {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
  },
});

export const {
  setModal
} = appSlice.actions;
export default appSlice.reducer; 