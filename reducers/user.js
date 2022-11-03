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
  },
});

export const { updateUserToken, updateUberToken } = userSlice.actions;

export default userSlice.reducer;
