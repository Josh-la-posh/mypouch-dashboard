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
  isFundingAdminWallet: false,
  isGottenLink: false,
  fundingWalletLink: null,
  isFundingAdminError: null,
  isAdminSuccessful: false
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
  },
});

export const { adminStart, adminSuccess, adminFailure, currencySuccess, adminDeleteStart, changePasswordSuccess, suspiciousActivitiesSuccess, allAdminSuccess, exchangeLimitSuccess, updateRateStart, updateRateSuccess, adminCurrencyStart, adminCurrencySuccess, adminCurrencyFailure, fundingWalletStart, fundingWalletSuccess, fundingWalletFailure, addAdminSuccess } = adminSlice.actions;

export default adminSlice.reducer;