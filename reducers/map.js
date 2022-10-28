import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.value.pickupAddress = action.payload.pickupAddress;
      state.value.arrivalAddress = action.payload.arrivalAddress;
    },
  },
});

export const { addAddress } = mapSlice.actions;

export default mapSlice.reducer;
