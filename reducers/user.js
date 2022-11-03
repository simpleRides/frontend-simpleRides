import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    tokenUber: null,
    tokenBolt: null,
    tokenHeetch: null,
    tokenMarcel: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserToken: (state, action) => {
      state.value.token = action.payload;
    },
    updateUberToken: (state, action) => {
      state.value.tokenUber = action.payload;
    },
    updateBoltToken: (state, action) => {
      state.value.tokenBolt = action.payload;
    },
    updateHeetchToken: (state, action) => {
      state.value.tokenHeetch = action.payload;
    },
    updateMarcelToken: (state, action) => {
      state.value.tokenMarcel = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const {
  updateUserToken,
  updateUberToken,
  updateBoltToken,
  updateHeetchToken,
  updateMarcelToken,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
