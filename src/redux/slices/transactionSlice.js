import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  wallets: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalRecords: 0,
  loading: false,
  error: null,
  isWalletLoading: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    transactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload.content;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.payloadSize;
      state.totalRecords = action.payload.totalRecords;
    },
    transactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    walletStart: (state) => {
      state.isWalletLoading = true;
    },
    walletSuccess: (state, action) => {
      state.isWalletLoading = false;
      state.wallets = action.payload;
    },
    walletFailure: (state) => {
      state.isWalletLoading = false;
    },
  },
});

export const { transactionStart, transactionSuccess, transactionFailure, walletStart, walletSuccess, walletFailure } = transactionSlice.actions;

export default transactionSlice.reducer;