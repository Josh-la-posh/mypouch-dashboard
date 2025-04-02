import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChangingPassword: false,
  isUpdating: false,
  adminLogs: [],
  adminLogsLoading: false,
  adminLogsError: null,
  activityLogs: [],
  activityLogsLoading: false,
  activityLogsError: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changePasswordStart: (state) => {
      state.isChangingPassword = true;
    },
    changePasswordSuccess: (state) => {
      state.isChangingPassword = false;
    },
    changePasswordFailure: (state) => {
      state.isChangingPassword = false;
    },
    updateAdminStart: (state) => {
      state.isUpdating = true;
    },
    updateAdminSuccess: (state) => {
      state.isUpdating = false;
    },
    updateAdminFailure: (state) => {
      state.isUpdating = false;
    },
    adminLogStart: (state) => {
      state.adminLogsLoading = true;
      state.adminLogsError = null;
    },
    adminLogSuccess: (state, action) => {
      state.adminLogsLoading = false;
      state.adminLogs = action.payload;
    },
    adminLogFailure: (state, action) => {
      state.adminLogsLoading = false;
      state.adminLogsError = action.payload;
    },
    activityLogStart: (state) => {
      state.activityLogsLoading = true;
      state.activityLogsError = null;
    },
    activityLogSuccess: (state, action) => {
      state.activityLogsLoading = false;
      state.activityLogs = action.payload;
    },
    activityLogFailure: (state, action) => {
      state.activityLogsLoading = false;
      state.activityLogsError = action.payload;
    }
  },
});

export const { changePasswordStart, changePasswordSuccess, changePasswordFailure, updateAdminStart, updateAdminSuccess, updateAdminFailure, adminLogStart, adminLogSuccess, adminLogFailure, activityLogStart, activityLogSuccess, activityLogFailure } = settingsSlice.actions;

export default settingsSlice.reducer;