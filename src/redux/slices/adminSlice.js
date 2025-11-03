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
  manualFundingProviders: [],
  manualFundingProvidersLoading: false,
  manualFundingProvidersError: null,
  isInitiatingManualFunding: false,
  manualFundingMessage: null,
  faqList: [],
  faqLoading: false,
  faqError: null,
  isCreatingFaq: false,
  isUpdatingFaq: false,
  isDeletingFaq: false,
  // Pending manual funding approvals
  pendingManualFunding: [],
  pendingManualFundingLoading: false,
  pendingManualFundingError: null,
  manualFundingReviewingId: null,
  isReviewingManualFunding: false,
  manualFundingReviewError: null,
  // All manual funding list (paginated)
  manualFundingAll: [],
  manualFundingAllLoading: false,
  manualFundingAllError: null,
  manualFundingAllPage: 1,
  manualFundingAllTotalPages: 1,
  manualFundingAllPageSize: 10,
  manualFundingAllTotalRecords: 0,
  // Providers management
  providerRegions: [],
  providerGateways: [],
  providers: [],
  providersLoading: false,
  providersError: null,
  isCreatingProvider: false,
  providerCreationError: null,
  // Currency history
  currencyHistory: [],
  currencyHistoryLoading: false,
  currencyHistoryError: null,
  currencyHistoryPage: 1,
  currencyHistoryTotalPages: 1,
  currencyHistoryPayloadSize: 0,
  currencyHistoryHasNext: false,
  currencyHistoryTotalRecords: 0,
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
    manualFundingProvidersStart: (state) => {
      state.manualFundingProvidersLoading = true;
      state.manualFundingProvidersError = null;
    },
    manualFundingProvidersSuccess: (state, action) => {
      state.manualFundingProvidersLoading = false;
      state.manualFundingProviders = action.payload;
    },
    manualFundingProvidersFailure: (state, action) => {
      state.manualFundingProvidersLoading = false;
      state.manualFundingProvidersError = action.payload;
    },
    initiateManualFundingStart: (state) => {
      state.isInitiatingManualFunding = true;
      state.manualFundingMessage = null;
    },
    initiateManualFundingSuccess: (state, action) => {
      state.isInitiatingManualFunding = false;
      state.manualFundingMessage = action.payload;
    },
    initiateManualFundingFailure: (state, action) => {
      state.isInitiatingManualFunding = false;
      state.manualFundingMessage = null;
      state.manualFundingProvidersError = action.payload; // reuse error bucket
    },
    clearManualFundingMessage: (state) => {
      state.manualFundingMessage = null;
    },
    faqFetchStart: (state) => {
      state.faqLoading = true;
      state.faqError = null;
    },
    faqFetchSuccess: (state, action) => {
      state.faqLoading = false;
      state.faqList = action.payload;
    },
    faqFetchFailure: (state, action) => {
      state.faqLoading = false;
      state.faqError = action.payload;
    },
    faqCreateStart: (state) => {
      state.isCreatingFaq = true;
    },
    faqCreateSuccess: (state, action) => {
      state.isCreatingFaq = false;
      state.faqList = [action.payload, ...state.faqList];
    },
    faqCreateFailure: (state, action) => {
      state.isCreatingFaq = false;
      state.faqError = action.payload;
    },
    faqUpdateStart: (state) => {
      state.isUpdatingFaq = true;
    },
    faqUpdateSuccess: (state, action) => {
      state.isUpdatingFaq = false;
      state.faqList = state.faqList.map(item => item.id === action.payload.id ? action.payload : item);
    },
    faqUpdateFailure: (state, action) => {
      state.isUpdatingFaq = false;
      state.faqError = action.payload;
    },
    faqDeleteStart: (state) => {
      state.isDeletingFaq = true;
    },
    faqDeleteSuccess: (state, action) => {
      state.isDeletingFaq = false;
      state.faqList = state.faqList.filter(item => item.id !== action.payload);
    },
    faqDeleteFailure: (state, action) => {
      state.isDeletingFaq = false;
      state.faqError = action.payload;
    },
    pendingManualFundingStart: (state) => {
      state.pendingManualFundingLoading = true;
      state.pendingManualFundingError = null;
    },
    pendingManualFundingSuccess: (state, action) => {
      state.pendingManualFundingLoading = false;
      state.pendingManualFunding = action.payload;
    },
    pendingManualFundingFailure: (state, action) => {
      state.pendingManualFundingLoading = false;
      state.pendingManualFundingError = action.payload;
    },
    reviewManualFundingStart: (state, action) => {
      state.isReviewingManualFunding = true;
      state.manualFundingReviewingId = action.payload; // id
      state.manualFundingReviewError = null;
    },
    reviewManualFundingSuccess: (state, action) => {
      const id = action.payload;
      state.isReviewingManualFunding = false;
      state.manualFundingReviewingId = null;
      // remove item from pending list
      state.pendingManualFunding = state.pendingManualFunding.filter(item => item.id !== id);
    },
    reviewManualFundingFailure: (state, action) => {
      state.isReviewingManualFunding = false;
      state.manualFundingReviewError = action.payload?.message || action.payload;
      state.manualFundingReviewingId = null;
    },
    manualFundingAllStart: (state) => {
      state.manualFundingAllLoading = true;
      state.manualFundingAllError = null;
    },
    manualFundingAllSuccess: (state, action) => {
      state.manualFundingAllLoading = false;
      const payload = action.payload || {};
      state.manualFundingAll = payload.content || [];
      state.manualFundingAllPage = payload.currentPage || 1;
      state.manualFundingAllTotalPages = payload.totalPages || 1;
      state.manualFundingAllPageSize = payload.payloadSize || (payload.content ? payload.content.length : 0);
      state.manualFundingAllTotalRecords = payload.totalRecords || (payload.content ? payload.content.length : 0);
    },
    manualFundingAllFailure: (state, action) => {
      state.manualFundingAllLoading = false;
      state.manualFundingAllError = action.payload;
    },
    providerFetchStart: (state) => {
      state.providersLoading = true;
      state.providersError = null;
    },
    providerFetchSuccess: (state, action) => {
      state.providersLoading = false;
      const { regions = [], gateways = [], providers = [] } = action.payload || {};
      if (regions.length) state.providerRegions = regions;
      if (gateways.length) state.providerGateways = gateways;
      if (Array.isArray(providers)) state.providers = providers;
    },
    providerFetchFailure: (state, action) => {
      state.providersLoading = false;
      state.providersError = action.payload;
    },
    providerCreateStart: (state) => {
      state.isCreatingProvider = true;
      state.providerCreationError = null;
    },
    providerCreateSuccess: (state, action) => {
      state.isCreatingProvider = false;
      // push new provider into list
      state.providers = [action.payload, ...state.providers];
    },
    providerCreateFailure: (state, action) => {
      state.isCreatingProvider = false;
      state.providerCreationError = action.payload;
    },
    currencyHistoryStart: (state) => {
      state.currencyHistoryLoading = true;
      state.currencyHistoryError = null;
    },
    currencyHistorySuccess: (state, action) => {
      state.currencyHistoryLoading = false;
      const payload = action.payload;
      // Support both paginated {content,currentPage,totalPages} or raw array
      if (Array.isArray(payload)) {
        state.currencyHistory = payload;
        state.currencyHistoryPage = 1;
        state.currencyHistoryTotalPages = 1;
        state.currencyHistoryPayloadSize = payload.length;
        state.currencyHistoryHasNext = false;
        state.currencyHistoryTotalRecords = payload.length;
      } else {
        state.currencyHistory = payload.content || [];
        state.currencyHistoryPage = payload.currentPage || 1;
        state.currencyHistoryTotalPages = payload.totalPages || 1;
        state.currencyHistoryPayloadSize = payload.payloadSize || state.currencyHistory.length;
        state.currencyHistoryHasNext = payload.hasNext || false;
        state.currencyHistoryTotalRecords = payload.totalRecords || state.currencyHistory.length;
      }
    },
    currencyHistoryFailure: (state, action) => {
      state.currencyHistoryLoading = false;
      state.currencyHistoryError = action.payload;
    },
  },
});

export const { adminStart, adminSuccess, adminFailure, currencySuccess, adminDeleteStart, changePasswordSuccess, suspiciousActivitiesSuccess, allAdminSuccess, exchangeLimitSuccess, commissionRateSuccess, updateRateStart, updateRateSuccess, adminCurrencyStart, adminCurrencySuccess, adminCurrencyFailure, fundingWalletStart, fundingWalletSuccess, fundingWalletFailure, addAdminSuccess, activateAdminStart, activateAdminSuccess, adminRoleSuccess, pouchTransactionStart, pouchTransactionSuccess, pouchTransactionFailure, manualFundingProvidersStart, manualFundingProvidersSuccess, manualFundingProvidersFailure, initiateManualFundingStart, initiateManualFundingSuccess, initiateManualFundingFailure, clearManualFundingMessage, faqFetchStart, faqFetchSuccess, faqFetchFailure, faqCreateStart, faqCreateSuccess, faqCreateFailure, faqUpdateStart, faqUpdateSuccess, faqUpdateFailure, faqDeleteStart, faqDeleteSuccess, faqDeleteFailure, currencyHistoryStart, currencyHistorySuccess, currencyHistoryFailure, pendingManualFundingStart, pendingManualFundingSuccess, pendingManualFundingFailure, reviewManualFundingStart, reviewManualFundingSuccess, reviewManualFundingFailure, manualFundingAllStart, manualFundingAllSuccess, manualFundingAllFailure, providerFetchStart, providerFetchSuccess, providerFetchFailure, providerCreateStart, providerCreateSuccess, providerCreateFailure } = adminSlice.actions;

export default adminSlice.reducer;