import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    updateUserToken: (state, action) => {
      state.value.nickname = action.payload;
    },
  },
});

export const { updateUserToken } = userSlice.actions;

export default userSlice.reducer;
