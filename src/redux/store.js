import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import transactionReducer from './slices/transactionSlice';
import messageReducer from './slices/messageSlice';
import settingReducer from './slices/settingSlice';
import roleReducer from './slices/roleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        user: userReducer,
        admin: adminReducer,
        transaction: transactionReducer,
        message: messageReducer,
        setting: settingReducer,
    role: roleReducer,
    }
});