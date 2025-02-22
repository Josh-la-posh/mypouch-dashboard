import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalUsers: {},
  transactionStat: [],
  adminActivities: [],
  loading: false,
  adminActivitiesLoading: false,
  error: null,
  adminActivitiesError: null
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
    },
    adminActivitiesStatStart: (state) => {
      state.adminActivitiesLoading = true;
      state.adminActivitiesError = null;
    },
    adminActivitiesStatSuccess: (state, action) => {
      state.adminActivitiesLoading = false;
      state.adminActivities = action.payload;
    },
    adminActivitiesStatFailure: (state, action) => {
      state.adminActivitiesLoading = false;
      state.adminActivitiesError = action.payload;
    }
  },
});

export const { statStart, statSuccess, statFailure, transactionStatStart, transactionStatSuccess, transactionStatFailure, adminActivitiesStatStart, adminActivitiesStatSuccess, adminActivitiesStatFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;