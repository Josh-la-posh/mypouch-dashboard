import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChangingPassword: false
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
    }
  },
});

export const { changePasswordStart, changePasswordSuccess, changePasswordFailure } = settingsSlice.actions;

export default settingsSlice.reducer;