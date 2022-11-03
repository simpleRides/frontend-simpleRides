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
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const { updateUserToken, updateUberToken, logout } = userSlice.actions;

export default userSlice.reducer;
