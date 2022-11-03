import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addSettingsToStore: (state, action) => {
      state.value = {
        clientNoteMin: action.payload.clientNoteMin,
        pickupDistanceMax: action.payload.pickupDistanceMax,
        priceMin: action.payload.priceMin,
        distanceMax: action.payload.distanceMax,
        markupMin: action.payload.markupMin,
      };
    },
  },
});

export const { addSettingsToStore } = settingsSlice.actions;

export default settingsSlice.reducer;
