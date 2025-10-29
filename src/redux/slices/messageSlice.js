import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
  isSendingBroadcast: false,
  broadcastSuccessMessage: null,
  broadcastError: null,
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
    },
    broadcastStart: (state) => {
      state.isSendingBroadcast = true;
      state.broadcastError = null;
      state.broadcastSuccessMessage = null;
    },
    broadcastSuccess: (state, action) => {
      state.isSendingBroadcast = false;
      state.broadcastSuccessMessage = action.payload;
    },
    broadcastFailure: (state, action) => {
      state.isSendingBroadcast = false;
      state.broadcastError = action.payload;
    },
    clearBroadcastMessage: (state) => {
      state.broadcastSuccessMessage = null;
      state.broadcastError = null;
    }
  },
});

export const { messageStart, messageSuccess, messageFailure, broadcastStart, broadcastSuccess, broadcastFailure, clearBroadcastMessage } = messageSlice.actions;

export default messageSlice.reducer;