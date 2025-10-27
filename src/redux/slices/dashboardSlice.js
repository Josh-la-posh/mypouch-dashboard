import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalUsers: {},
  transactions: [],
  transactionStat: [],
  adminActivities: [],
  loading: false,
  isTransactionLoading: false,
  adminActivitiesLoading: false,
  error: null,
  adminActivitiesError: null,
  rates: [],
  rateLoading: false,
  rateError: null,
  // User Balance (All user wallets aggregate)
  userBalance: null,
  userBalanceLoading: false,
  userBalanceError: null,
  // Pouch / System wallets balance
  pouchBalance: [],
  pouchBalanceLoading: false,
  pouchBalanceError: null,
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
    transactionStart: (state) => {
      state.isTransactionLoading = true;
    },
    transactionSuccess: (state, action) => {
      state.isTransactionLoading = false;
      state.transactions = action.payload.content;
    },
    transactionFailure: (state) => {
      state.loading = false;
    },
    rateStart: (state) => {
      state.rateLoading = true;
      state.error = null;
    },
    rateSuccess: (state, action) => {
      state.rateLoading = false;
      state.rates = action.payload;
    },
    rateFailure: (state, action) => {
      state.rateLoading = false;
      state.error = action.payload;
    },
    // User Balance reducers
    userBalanceStart: (state) => {
      state.userBalanceLoading = true;
      state.userBalanceError = null;
    },
    userBalanceSuccess: (state, action) => {
      state.userBalanceLoading = false;
      state.userBalance = action.payload;
    },
    userBalanceFailure: (state, action) => {
      state.userBalanceLoading = false;
      state.userBalanceError = action.payload;
    },
    // Pouch Balance reducers
    pouchBalanceStart: (state) => {
      state.pouchBalanceLoading = true;
      state.pouchBalanceError = null;
    },
    pouchBalanceSuccess: (state, action) => {
      state.pouchBalanceLoading = false;
      state.pouchBalance = action.payload;
    },
    pouchBalanceFailure: (state, action) => {
      state.pouchBalanceLoading = false;
      state.pouchBalanceError = action.payload;
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

export const { statStart, statSuccess, statFailure, transactionStart, transactionSuccess, transactionFailure, rateStart, rateSuccess, rateFailure, transactionStatStart, transactionStatSuccess, transactionStatFailure, adminActivitiesStatStart, adminActivitiesStatSuccess, adminActivitiesStatFailure, userBalanceStart, userBalanceSuccess, userBalanceFailure, pouchBalanceStart, pouchBalanceSuccess, pouchBalanceFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;