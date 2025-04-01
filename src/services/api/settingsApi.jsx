import { toast } from "react-toastify";
import { changePasswordSuccess } from "../../redux/slices/adminSlice";
import { changePasswordFailure, changePasswordStart } from "../../redux/slices/settingSlice";
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
            dispatch(changePasswordFailure(err.response.data.message));
        } else {
            dispatch(changePasswordFailure(err.response.data.message));
            toast.error(err.response.data.message);
        }
        }
    }
    };
}
  
export default SettingsService;