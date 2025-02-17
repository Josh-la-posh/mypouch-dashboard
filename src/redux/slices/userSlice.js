import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalRecords: 0,
  userDetail: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'dashboard',
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
      state.loading = true;
      state.error = null;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    userDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { userStart, userSuccess, userFailure, userDetailStart, userDetailSuccess, userDetailFailure } = userSlice.actions;

export default userSlice.reducer;