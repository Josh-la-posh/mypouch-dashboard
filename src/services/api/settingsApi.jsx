import { toast } from "react-toastify";
import { changePasswordSuccess } from "../../redux/slices/adminSlice";
import { adminLogFailure, adminLogStart, adminLogSuccess, changePasswordFailure, changePasswordStart, updateAdminFailure, updateAdminStart, updateAdminSuccess } from "../../redux/slices/settingSlice";
import { axiosPrivate } from "./axios";

class SettingsService {
    constructor(axiosPrivate) {
        this.axiosPrivate = axiosPrivate;
    }
    
    async changePassword(formData, dispatch) {
    try {
        dispatch(changePasswordStart());
        const response = await axiosPrivate.post(
        '/admin/change-password',
            JSON.stringify(formData),
        );
        toast.success('Password changed successfully');
        dispatch(changePasswordSuccess())
    } catch (err) {
        if (!err.response) {
        toast.error('No Server Response');
        return dispatch(changePasswordFailure('No Server Response'));
        } else {
        if (err.response.status === 400) {
            console.log('The error is ', err.response);
            dispatch(changePasswordFailure());
            toast.error(err.response.data.message);
        } else {
            dispatch(changePasswordFailure());
            toast.error(err.response.data.message);
        }
        }
    }
    };
    
    async updateAdminDetails(formData, setAuth, dispatch) {
        try {
            dispatch(updateAdminStart());
            const response = await axiosPrivate.post(
            '/admin/change-details',
                JSON.stringify(formData),
            );
            const data = response.data;
            setAuth((prev) => ({
                ...prev,
                data: data
            }));
            dispatch(updateAdminSuccess())
            toast.success('Profile updated successfully!');
        } catch (err) {
            if (!err.response) {
                dispatch(updateAdminFailure());
                return toast.error('No Server Response');
            } else {
                if (err.response.status === 400) {
                    dispatch(updateAdminFailure());
                    toast.error('Failed to update profile. Please try again.');
                } else {
                    dispatch(updateAdminFailure());
                    toast.error('Failed to update profile. Please try again.');
                }
            }
        }
    };
    
    async fetchAdminLogs(dispatch) {
        try {
            dispatch(adminLogStart());
            const response = await axiosPrivate.get('/admin/acticities-admin-login');
            const data = response.data;
            dispatch(adminLogSuccess(data))
        } catch (err) {
            if (!err.response) {
                dispatch(adminLogFailure('No Server Response'));
                return toast.error('No Server Response');
            } else {
                if (err.response.status === 400) {
                    dispatch(adminLogFailure(err?.response?.data?.message));
                    toast.error(err?.response?.data?.message);
                } else {
                    dispatch(adminLogFailure(err?.response?.data?.message));
                    toast.error(err?.response?.data?.message);
                }
            }
        }
    };
}
  
export default SettingsService;