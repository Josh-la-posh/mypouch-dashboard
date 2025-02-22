import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalRecords: 0,
  userDetail: {},
  userAccount: [],
  userTransactions: [],
  userActivity: {},
  userVerification: {},
  loading: false,
  updateLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.content;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.payloadSize;
      state.totalRecords = action.payload.totalRecords;
    },
    userFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailStart: (state) => {
      state.error = null;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.updateLoading = false;
      state.userDetail = action.payload;
    },
    userDetailFailure: (state, action) => {
      state.loading = false;
      state.updateLoading = false;
      state.error = action.payload;
    },
    userUpdateStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },
    userAccountSuccess: (state, action) => {
      state.loading = false;
      state.userAccount = action.payload;
    },
    userTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userTransactionSuccess: (state, action) => {
      state.loading = false;
      state.userTransactions = action.payload.content;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.payloadSize;
      state.totalRecords = action.payload.totalRecords;
    },
    userTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userActivitySuccess: (state, action) => {
      state.loading = false;
      state.userActivity = action.payload;
    },
    userVerificationSuccess: (state, action) => {
      state.loading = false;
      state.userVerification = action.payload;
    },
  },
});

export const { userStart, userSuccess, userFailure, userDetailStart, userDetailSuccess, userDetailFailure, userUpdateStart, userAccountSuccess, userTransactionStart, userTransactionSuccess, userTransactionFailure, userActivitySuccess, userVerificationSuccess } = userSlice.actions;

export default userSlice.reducer;