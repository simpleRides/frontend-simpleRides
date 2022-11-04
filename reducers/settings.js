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
    updateClientNoteMin: (state, action) => {
      state.value.clientNoteMin = action.payload;
    },
    updatePickupDistanceMax: (state, action) => {
      state.value.pickupDistanceMax = action.payload;
    },
    updatePriceMin: (state, action) => {
      state.value.priceMin = action.payload;
    },
    updateDistanceMax: (state, action) => {
      state.value.distanceMax = action.payload;
    },
    updateMarkupMin: (state, action) => {
      state.value.markupMin = action.payload;
    },
  },
});

export const {
  addSettingsToStore,
  updateClientNoteMin,
  updatePickupDistanceMax,
  updatePriceMin,
  updateDistanceMax,
  updateMarkupMin,
} = settingsSlice.actions;

export default settingsSlice.reducer;
