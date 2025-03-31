// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: false,
  isVerifyingCode: false,
  error: null,
  isQrVisible: false,
  is2faVisible: false,
  qrCode: null,
  userId: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isQrVisible = false;
      state.isVerifyingCode = false;
      state.is2faVisible = false;
      state.qrCode = null;
      state.userId = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isQrVisible = !action.payload.isTwoFactorEnabled;
      state.isVerifyingCode = false;
      state.is2faVisible = action.payload.isTwoFactorEnabled;
      state.userId = action.payload.userId;
      state.qrCode = null;
    },
    loginQrStart: (state) => {
      state.loading = true;
      state.isQrVisible = false;
      state.isVerifyingCode = false;
      state.is2faVisible = false;
      state.qrCode = null;
      state.userId = null;
      state.isLoggedIn = false;
    },
    loginQrSuccess: (state, action) => {
      state.loading = false;
      state.isQrVisible = true;
      state.isVerifyingCode = false;
      state.qrCode = action.payload.link;
      state.userId = action.payload.userId;
      state.isLoggedIn = false;
    },
    loginVerifyQrCodeStart: (state) => {
      state.isVerifyingCode = true;
    },
    loginVerifyQrCodeSuccess: (state) => {
      state.isVerifyingCode = false;
    },
    login2faStart: (state) => {
      state.loading = true;
      state.isQrVisible = false;
      state.isVerifyingCode = false;
      state.is2faVisible = true;
      state.qrCode = null;
      state.isLoggedIn = false;
    },
    login2faSuccess: (state, action) => {
      state.loading = false;
      state.isQrVisible = false;
      state.isVerifyingCode = false;
      state.is2faVisible = true;
      state.qrCode = null;
      state.userId = action.payload;
      state.isLoggedIn = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.isQrVisible = false;
      state.isVerifyingCode = false;
      state.is2faVisible = state.userId === null ? false : true;
      state.qrCode = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, loginQrStart, loginQrSuccess, loginVerifyQrCodeStart, loginVerifyQrCodeSuccess, login2faStart, login2faSuccess, logout } = authSlice.actions;

export default authSlice.reducer;