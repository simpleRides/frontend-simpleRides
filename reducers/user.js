import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserToken: (state, action) => {
      state.value.token = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const { updateUserToken, logout } = userSlice.actions;

export default userSlice.reducer;
