import { toast } from "react-toastify";
import { actionFinished, actionStart, userAccountSuccess, userActivitySuccess, userBankFailure, userBankStart, userBankSuccess, userDetailFailure, userDetailStart, userDetailSuccess, userFailure, userStart, userSuccess, userTransactionFailure, userTransactionStart, userTransactionSuccess, userUpdateStart, userVerificationSuccess } from "../../redux/slices/userSlice";
import { axiosPrivate } from "./axios";

class UserService {
    constructor(location) {
        this.location = location;
    }

    async fetchUsers(search, status, page, limit, dispatch) {
      try {
        dispatch(userStart());
        const response = await axiosPrivate.get(
          `/users/admin/users?search=${search}&status=${status}&page=${page}&limit=${limit}`);
        
        const data = response.data;
        dispatch(userSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
            dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchBankDetail(id, dispatch) {  
      try {
        dispatch(userBankStart());

        const response = await axiosPrivate.get(`/wallet/admin/banks/${id}`);
        const data = response.data;
        console.log('The bank details are: ', data);
        dispatch(userBankSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userBankFailure('No Server Response'));
        } else {
            dispatch(userBankFailure(err.response.data.message));
        }
      }
    };

    async fetchUserDetail(id, dispatch) {  
      try {
        dispatch(userDetailStart());

        const response = await axiosPrivate.get(`/users/admin/user/${id}`);
        
        const data = response.data;
        dispatch(userDetailSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userDetailFailure('No Server Response'));
        } else {
            dispatch(userDetailFailure(err.response.data.message));
        }
      }
    };

    async blockUser(id, dispatch) {  
      try {
        dispatch(actionStart());
        await axiosPrivate.patch(`/users/${id}/block`);
        await this.fetchUserDetail(id, dispatch)
        dispatch(actionFinished());
      } catch (err) {
        if (!err.response) {
          dispatch(actionFinished('No Server Response'));
        } else {
          dispatch(actionFinished(err.response.data.message));
        }
      }
    };

    async unblockUser(id, dispatch) {  
      try {
        dispatch(actionStart());
        await axiosPrivate.patch(`/users/${id}/unblock`);
        await this.fetchUserDetail(id, dispatch)        
        dispatch(actionFinished());
      } catch (err) {
        if (!err.response) {
          dispatch(actionFinished('No Server Response'));
        } else {
          dispatch(actionFinished(err.response.data.message));
        }
      }
    };

    async deleteUser(id, dispatch) {  
      try {
        dispatch(actionStart());
        await axiosPrivate.patch(`/users/${id}/delete`);
        await this.fetchUserDetail(id, dispatch);
        dispatch(actionFinished());
        toast.success('User deleted successfully');
      } catch (err) {
        if (!err.response) {
          dispatch(actionFinished('No Server Response'));
        } else {
          dispatch(actionFinished(err.response.data.message));
        }
      }
    };

    async updateUserDetail(id,formData, dispatch) {  
      try {
        dispatch(userUpdateStart());

        await axiosPrivate.patch(`/users/${id}`,
          JSON.stringify(formData)
        );
        toast.success('User data updated successfully!!!');
        this.fetchUserDetail(id, dispatch);
      } catch (err) {
        if (!err.response) {
          dispatch(userDetailFailure('No Server Response'));
        } else {
            dispatch(userDetailFailure(err.response.data.message));
        }
      }
    };

    async fetchUserAccount(id, dispatch) {  
      try {
        dispatch(userStart());

        const response = await axiosPrivate.get(`/wallet/admin/wallet/${id}`);
        
        const data = response.data;
        dispatch(userAccountSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
            dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchUserTraansactions(id, filters, dispatch) {  
      try {
        dispatch(userTransactionStart());
        const { date = '', transactionType = '', search = '', status = '', currency = '', page = 1, limit = 10 } = filters || {};
        // Build query string only with provided (non-empty) params
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (transactionType) params.append('transactionType', transactionType);
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (currency) params.append('currency', currency);
        params.append('page', page);
        params.append('limit', limit);

        const response = await axiosPrivate.get(`/transaction/admin/${id}?${params.toString()}`);
        const data = response.data;
        dispatch(userTransactionSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userTransactionFailure('No Server Response'));
        } else {
          dispatch(userTransactionFailure(err.response.data.message));
        }
      }
    };

    async fetchUserActivities(id, dispatch) {  
      try {
        dispatch(userStart());

        const response = await axiosPrivate.get(`/admin/user-activities/${id}`);
        
        const data = response.data;
        console.log(data);
        dispatch(userActivitySuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
          dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchUserVerification(id, dispatch) {  
      try {
        dispatch(userStart());
        const response = await axiosPrivate.get(`/users/verification/${id}`);
        
        const data = response.data;
        dispatch(userVerificationSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
          dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async exportUserTransactionsExcel(filters) {
      try {
        const { date = '', transactionType = '', search = '', status = '', currency = '', page = 1, limit = 10 } = filters || {};
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (transactionType) params.append('transactionType', transactionType);
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (currency) params.append('currency', currency);
        params.append('page', page);
        params.append('limit', limit);

        const response = await axiosPrivate.get(`/transaction/admin/all/transaction/excel?${params.toString()}`, {
          responseType: 'blob'
        });
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        a.download = `transactions-export-${timestamp}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Export successful');
      } catch (err) {
        if (!err.response) {
          toast.error('Export failed: No Server Response');
        } else {
          toast.error(`Export failed: ${err.response.data.message || 'Server Error'}`);
        }
      }
    }

    async exportUsersExcel({ search = '', status = '' }) {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        const response = await axiosPrivate.get(`/users/admin/all/users/excel?${params.toString()}`, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        a.download = `users-export-${timestamp}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Users export successful');
      } catch (err) {
        if (!err.response) {
          toast.error('Export failed: No Server Response');
        } else {
          toast.error(`Export failed: ${err.response.data.message || 'Server Error'}`);
        }
      }
    }
}
  
export default UserService;