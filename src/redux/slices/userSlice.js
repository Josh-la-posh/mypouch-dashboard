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
  userBanks: [],
  banksLoading: false,
  bankError: null,
  userActivity: {},
  userVerification: {},
  loading: false,
  updateLoading: false,
  error: null,
  isPerformingAction: false
  , // User-specific transaction limits
  userLimits: [],
  userLimitsLoading: false,
  userLimitsError: null,
  isSettingUserLimit: false,
  setUserLimitError: null
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
    userBankStart: (state) => {
      state.banksLoading = true;
      state.bankError = null;
    },
    userBankSuccess: (state, action) => {
      state.banksLoading = false;
      state.userBanks = action.payload;
    },
    userBankFailure: (state, action) => {
      state.banksLoading = false;
      state.bankError = action.payload;
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
    actionStart: (state) => {
      state.isPerformingAction = true;
    },
    actionFinished: (state) => {
      state.isPerformingAction = false;
    },
    userLimitsFetchStart: (state) => {
      state.userLimitsLoading = true;
      state.userLimitsError = null;
    },
    userLimitsFetchSuccess: (state, action) => {
      state.userLimitsLoading = false;
      state.userLimits = action.payload || [];
    },
    userLimitsFetchFailure: (state, action) => {
      state.userLimitsLoading = false;
      state.userLimitsError = action.payload;
    },
    setUserLimitStart: (state) => {
      state.isSettingUserLimit = true;
      state.setUserLimitError = null;
    },
    setUserLimitSuccess: (state, action) => {
      state.isSettingUserLimit = false;
      // store returned limit(s)
      if (action.payload) state.userLimits = action.payload;
    },
    setUserLimitFailure: (state, action) => {
      state.isSettingUserLimit = false;
      state.setUserLimitError = action.payload;
    }
  },
});

export const { userStart, userSuccess, userFailure, userBankStart, userBankFailure, userBankSuccess, userDetailStart, userDetailSuccess, userDetailFailure, userUpdateStart, userAccountSuccess, userTransactionStart, userTransactionSuccess, userTransactionFailure, userActivitySuccess, userVerificationSuccess, actionStart, actionFinished, userLimitsFetchStart, userLimitsFetchSuccess, userLimitsFetchFailure, setUserLimitStart, setUserLimitSuccess, setUserLimitFailure } = userSlice.actions;

export default userSlice.reducer;