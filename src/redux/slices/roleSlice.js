import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  actionLoading: false,
  error: null,
  roles: [],
  permissions: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    roleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    roleSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    roleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    permissionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    permissionSuccess: (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
    },
    permissionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    roleActionStart: (state) => {
      state.actionLoading = true;
      state.error = null;
    },
    roleActionFinished: (state) => {
      state.actionLoading = false;
    }
  }
});

export const { roleStart, roleSuccess, roleFailure, permissionStart, permissionSuccess, permissionFailure, roleActionStart, roleActionFinished } = roleSlice.actions;

export default roleSlice.reducer;