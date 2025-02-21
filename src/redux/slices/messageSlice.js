import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    messageSuccess: (state, action) => {
      state.loading = false;
      state.totalUsers = action.payload;
    },
    messageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { messageStart, messageSuccess, messageFailure } = messageSlice.actions;

export default messageSlice.reducer;