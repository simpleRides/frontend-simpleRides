import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    clientNoteMin: 0,
    pickupDistanceMax: 10000,
    priceMin: 0,
    distanceMax: 10000,
    markupMin: 1,
  },
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
