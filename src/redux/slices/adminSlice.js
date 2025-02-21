import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  deleteLoading: false,
  error: null,
  currencies: [],
  suspiciousActivities: [],
  allAdmin: [],
  exchangeLimit: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    adminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminDeleteStart: (state) => {
      state.loading = true;
      state.deleteLoading = true;
      state.error = null;
    },
    currencySuccess: (state, action) => {
      state.loading = false;
      state.currencies = action.payload;
    },    
    changePasswordSuccess: (state, action) => {
      state.loading = false;
    },
    suspiciousActivitiesSuccess: (state, action) => {
      state.loading = false;
      state.suspiciousActivities = action.payload;
    },
    allAdminSuccess: (state, action) => {
      state.loading = false;
      state.allAdmin = action.payload;
    },
    exchangeLimitSuccess: (state, action) => {
      state.loading = false;
      state.exchangeLimit = action.payload;
    },
  },
});

export const { adminStart, adminSuccess, adminFailure, currencySuccess, adminDeleteStart, changePasswordSuccess, suspiciousActivitiesSuccess, allAdminSuccess, exchangeLimitSuccess } = adminSlice.actions;

export default adminSlice.reducer;