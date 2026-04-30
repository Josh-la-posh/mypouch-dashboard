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
  // Transaction Limits
  limits: [],
  limitsLoading: false,
  limitsError: null,
  isCreatingLimit: false,
  createLimitError: null,
  // Transaction Fees
  transactionFees: [],
  transactionFeesLoading: false,
  transactionFeesError: null,
  isSavingTransactionFee: false,
  saveTransactionFeeError: null,
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
    limitsFetchStart: (state) => {
      state.limitsLoading = true;
      state.limitsError = null;
    },
    limitsFetchSuccess: (state, action) => {
      state.limitsLoading = false;
      state.limits = action.payload || [];
    },
    limitsFetchFailure: (state, action) => {
      state.limitsLoading = false;
      state.limitsError = action.payload;
    },
    createLimitStart: (state) => {
      state.isCreatingLimit = true;
      state.createLimitError = null;
    },
    createLimitSuccess: (state, action) => {
      state.isCreatingLimit = false;
      // prepend new limit for instant feedback
      if (action.payload) state.limits = [action.payload, ...state.limits];
    },
    createLimitFailure: (state, action) => {
      state.isCreatingLimit = false;
      state.createLimitError = action.payload;
    },
    transactionFeeFetchStart: (state) => {
      state.transactionFeesLoading = true;
      state.transactionFeesError = null;
    },
    transactionFeeFetchSuccess: (state, action) => {
      state.transactionFeesLoading = false;
      state.transactionFees = action.payload || [];
    },
    transactionFeeFetchFailure: (state, action) => {
      state.transactionFeesLoading = false;
      state.transactionFeesError = action.payload;
    },
    transactionFeeSaveStart: (state) => {
      state.isSavingTransactionFee = true;
      state.saveTransactionFeeError = null;
    },
    transactionFeeSaveSuccess: (state) => {
      state.isSavingTransactionFee = false;
    },
    transactionFeeSaveFailure: (state, action) => {
      state.isSavingTransactionFee = false;
      state.saveTransactionFeeError = action.payload;
    },
  },
});

export const {
  transactionStart,
  transactionSuccess,
  transactionFailure,
  walletStart,
  walletSuccess,
  walletFailure,
  limitsFetchStart,
  limitsFetchSuccess,
  limitsFetchFailure,
  createLimitStart,
  createLimitSuccess,
  createLimitFailure,
  transactionFeeFetchStart,
  transactionFeeFetchSuccess,
  transactionFeeFetchFailure,
  transactionFeeSaveStart,
  transactionFeeSaveSuccess,
  transactionFeeSaveFailure
} = transactionSlice.actions;

export default transactionSlice.reducer;
