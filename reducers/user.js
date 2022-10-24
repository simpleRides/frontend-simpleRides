import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { nickname: null, places: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateNickname: (state, action) => {
      state.value.nickname = action.payload;
    },
    addPlace: (state, action) => {
      state.value.places.push(action.payload);  
    },
    removePlace: (state, action) => {
      state.value.places = state.value.places.filter(e => e.name !== action.payload);
    },
    replacePlaces: (state, {payload}) => {
      state.value.places = payload;
    },
    resetPlaces: (state, action) => {
      state.value.places = [];
    }
  },
});

export const { updateNickname, addPlace, removePlace, replacePlaces, resetPlaces } = userSlice.actions;
export default userSlice.reducer;
