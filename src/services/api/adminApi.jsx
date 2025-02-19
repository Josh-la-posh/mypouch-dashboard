import { axiosPrivate } from "./axios";
import { adminFailure, adminStart, changePasswordSuccess, currencySuccess, rolesAndPermissionSuccess, suspiciousActivitiesSuccess } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";

class AdminService {
    constructor(axiosPrivate, navigate) {
        this.axiosPrivate = axiosPrivate;
        this.navigate = navigate;
    }

    async addAdmin(formData, dispatch) {  
      try {
        dispatch(adminStart());
        await axiosPrivate.post('/admin/invite-admin',
            JSON.stringify(formData)
        );
        toast.success('An email has been sent to the admin');
      } catch (err) {
        if (!err.response) {
            dispatch(adminFailure('No Server Response'));
        } else {
            dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async updateAdmin(id, formData, dispatch) {  
      try {
        dispatch(adminStart());
        await axiosPrivate.put(`/admin/update-admin&id=${id}`,
            JSON.stringify(formData)
        );
        const data = response.data;
        dispatch(addAdminSuccess(data));
      } catch (err) {
        if (!err.response) {
            dispatch(adminFailure('No Server Response'));
        } else {
            dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async createDefaultExchangeRate(formData, dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.post('/admin/exchange-rate-bulk-create',
            JSON.stringify({"exchangeRates": formData})
        );
        const data = response.data;
        toast.success('Rate created successfully');
        this.navigate('/admin/view-currencies');
      } catch (err) {
        if (!err.response) {
            dispatch(adminFailure('No Server Response'));
        } else {
            dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async fetchDefaultExchangeRate(dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.get('/admin/exchangerate-all');
        const data = response.data;
        dispatch(currencySuccess(data));
      } catch (err) {
        if (!err.response) {
            dispatch(adminFailure('No Server Response'));
        } else {
            dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async deleteDefaultExchangeRate(id, dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.delete(`/admin/exchange-rate/${id}`);
        toast('Rate deleted successfully');
        this.fetchDefaultExchangeRate(dispatch);
      } catch (err) {
        if (!err.response) {
            dispatch(adminFailure('No Server Response'));
        } else {
            dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async changePassword(formData, dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.put('',
          JSON.stringify(formData)
        );
        dispatch(changePasswordSuccess())
        toast.success('Password changed successfully');
      } catch (err) {
        if (!err.response) {
          dispatch(adminFailure('No Server Response'));
        } else {
          dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async setCurrencyExchangelimit(formData, dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.post('',
          JSON.stringify(formData)
        );
        dispatch(changePasswordSuccess())
        toast.success('Exchange limit set successfully');
      } catch (err) {
        if (!err.response) {
          dispatch(adminFailure('No Server Response'));
        } else {
          dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async fetchSuspiciousActivities(dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.get('');
        const data = response.data;
        dispatch(suspiciousActivitiesSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(adminFailure('No Server Response'));
        } else {
          dispatch(adminFailure(err.response.data.message));
        }
      }
    };

    async fetchAdminRolesAndPermissions(dispatch) {
      try {
        dispatch(adminStart());
        const response = await axiosPrivate.get('');
        const data = response.data;
        dispatch(rolesAndPermissionSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(adminFailure('No Server Response'));
        } else {
          dispatch(adminFailure(err.response.data.message));
        }
      }
    };
}
  
export default AdminService;