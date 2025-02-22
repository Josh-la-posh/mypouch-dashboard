import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        user: userReducer,
        admin: adminReducer,
        message: messageReducer,
    }
});