import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalUsers: {},
  transactionStat: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    statStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    statSuccess: (state, action) => {
      state.loading = false;
      state.totalUsers = action.payload;
    },
    statFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    transactionStatStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    transactionStatSuccess: (state, action) => {
      state.loading = false;
      state.transactionStat = action.payload;
    },
    transactionStatFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { statStart, statSuccess, statFailure, transactionStatStart, transactionStatSuccess, transactionStatFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;