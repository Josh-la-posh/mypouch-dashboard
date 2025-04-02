import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  deleteLoading: false,
  error: null,
  isUpdating: false,
  currencies: [],
  suspiciousActivities: [],
  allAdmin: [],
  adminCurrenciesLoading: false,
  adminCurrenciesError: null,
  adminCurrencies: [],
  exchangeLimit: {},
  commissionRate: {},
  adminRoles: [],
  isFundingAdminWallet: false,
  isGottenLink: false,
  fundingWalletLink: null,
  isFundingAdminError: null,
  isAdminSuccessful: false,
  isActivatingAdmin: false,
  pouchTransaction: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  pouchTransactionLoading: false,
  pouchTransactionError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.isAdminSuccessful = false;
    },
    adminSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    adminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.isAdminSuccessful = false;
      state.isActivatingAdmin = false;
    },
    activateAdminStart: (state) => {
      state.isActivatingAdmin = true;
    },
    activateAdminSuccess: (state) => {
      state.isActivatingAdmin = false;
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
    changePasswordSuccess: (state) => {
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
    commissionRateSuccess: (state, action) => {
      state.loading = false;
      state.commissionRate = action.payload;
    },
    updateRateStart: (state) => {
      state.isUpdating = true;
    },
    updateRateSuccess: (state) => {
      state.isUpdating = false;
    },
    adminCurrencyStart: (state) => {
      state.adminCurrenciesLoading = true;
      state.adminCurrenciesError = null;
      state.isFundingAdminWallet = false;
      state.isGottenLink = false;
      state.fundingWalletLink = null;
      state.isFundingAdminError = null;
    },
    adminCurrencySuccess: (state, action) => {
      state.adminCurrenciesLoading = false;
      state.adminCurrencies = action.payload;
    },
    adminCurrencyFailure: (state, action) => {
      state.adminCurrenciesLoading = true;
      state.adminCurrenciesError = action.payload;
    },
    fundingWalletStart: (state) => {
      state.isFundingAdminWallet = true;
      state.isFundingAdminError = null;
      state.isGottenLink = false;
      state.fundingWalletLink = null;
    },
    fundingWalletSuccess: (state, action) => {
      state.isFundingAdminWallet = false;
      state.isGottenLink = true;
      state.fundingWalletLink = action.payload;
    },
    fundingWalletFailure: (state, action) => {
      state.isFundingAdminWallet = false;
      state.isFundingAdminError = action.payload;
      state.isGottenLink = false;
      state.fundingWalletLink = null;
    },
    addAdminSuccess: (state) => {
      state.isAdminSuccessful = true;
      state.loading = false;
      state.error = null;
    },
    adminRoleSuccess: (state, action) => {
      state.adminRoles = action.payload;
    },
    pouchTransactionStart: (state) => {
      state.pouchTransactionLoading = true;
      state.pouchTransactionError = null;
    },
    pouchTransactionSuccess: (state, action) => {
      state.pouchTransactionLoading = false;
      state.pouchTransaction = action.payload.content;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.payloadSize;
    },
    pouchTransactionFailure: (state, action) => {
      state.pouchTransactionLoading = false;
      state.pouchTransactionError = action.payload;
    },
  },
});

export const { adminStart, adminSuccess, adminFailure, currencySuccess, adminDeleteStart, changePasswordSuccess, suspiciousActivitiesSuccess, allAdminSuccess, exchangeLimitSuccess, commissionRateSuccess, updateRateStart, updateRateSuccess, adminCurrencyStart, adminCurrencySuccess, adminCurrencyFailure, fundingWalletStart, fundingWalletSuccess, fundingWalletFailure, addAdminSuccess, activateAdminStart, activateAdminSuccess, adminRoleSuccess, pouchTransactionStart, pouchTransactionSuccess, pouchTransactionFailure } = adminSlice.actions;

export default adminSlice.reducer;