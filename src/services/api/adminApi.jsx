import { axiosPrivate } from "./axios";
import { activateAdminStart, activateAdminSuccess, addAdminSuccess, adminCurrencyFailure, adminCurrencyStart, adminCurrencySuccess, adminFailure, adminRoleSuccess, adminStart, adminSuccess, allAdminSuccess, changePasswordSuccess, commissionRateSuccess, currencySuccess, exchangeLimitSuccess, fundingWalletFailure, fundingWalletStart, fundingWalletSuccess, pouchTransactionFailure, pouchTransactionStart, pouchTransactionSuccess, suspiciousActivitiesSuccess, updateRateStart, updateRateSuccess } from "../../redux/slices/adminSlice";
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
      dispatch(addAdminSuccess());
    } catch (err) {
      console.log(err);
      if (!err.response) {
          dispatch(adminFailure('No Server Response'));
      } 

      if (err.response.status === 400) {
        toast.error(err.response.data.message);
        dispatch(adminFailure());
      } else {
        toast.error(err.response.data.message);
          dispatch(adminFailure());
      }
    }
  };

  async updateAdmin(id, formData, dispatch) {  
    try {
      dispatch(adminStart());
      await axiosPrivate.post(`/admin/update-admin?id=${id}`,
          JSON.stringify(formData)
      );
      // const data = response.data;
      dispatch(adminSuccess());
      toast.success('Admin data updated successfully');
    } catch (err) {
      if (!err.response) {
          dispatch(adminFailure('No Server Response'));
      } else {
          dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async fetchAllAdminRoles(dispatch) {
    try {
      const response = await axiosPrivate.get('/role/get');
      const data = response.data;
      dispatch(adminRoleSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };

  async updateAdminRole(id, newRole, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.post(`/admin/update-admin-role/${id}`,
        JSON.stringify({'newRole': newRole})
      );
      await this.fetchAllAdmin(dispatch);
      dispatch(activateAdminSuccess());
      toast.success(response.data.message);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async unblockAdmin(id, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.put(`/admin/unblock-admin/${id}`);
      await this.fetchAllAdmin(dispatch);
      dispatch(activateAdminSuccess());
      toast.success(response.data.message);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async blockAdmin(id, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.put(`/admin/block-admin/${id}`);
      await this.fetchAllAdmin(dispatch);
      dispatch(activateAdminSuccess());
      toast.success(response.data.message);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async deactivateAdmin(id, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.put(`/admin/deactivate-admin/${id}`);
      await this.fetchAllAdmin(dispatch);
      dispatch(activateAdminSuccess());
      toast.success(response.data.message);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async deleteAdmin(id, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.delete(`/admin/delete-admin/${id}`);
      await this.fetchAllAdmin(dispatch);
      dispatch(activateAdminSuccess());
      toast.success(response.data.message);
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
      dispatch(adminSuccess());
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

  async updateDefaultExchangeRate(formData, dispatch) {
    try {
      dispatch(updateRateStart());
      const response = await axiosPrivate.post('/admin/exchange-rate-bulk-create',
        JSON.stringify({"exchangeRates": formData})
      );
      dispatch(updateRateSuccess());
      toast.success('Rate updated successfully');
      this.fetchDefaultExchangeRate(dispatch);
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

  async setCurrencyExchangelimit(formData, dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.post('/admin/mark-up',
        JSON.stringify(formData)
      );
      toast.success('Exchange limit set successfully');
      this.fetchCurrencyExchangelimit(dispatch);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async fetchCurrencyExchangelimit(dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.get('/admin/mark-up');
      dispatch(exchangeLimitSuccess(response.data?.deviation));
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async setCommissionRate(formData, dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.post('/admin/commission-rate',
        JSON.stringify(formData)
      );
      toast.success('Commission rate set successfully');
      this.fetchCommissionRate(dispatch);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async fetchCommissionRate(dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.get('/admin/commission-rate');
      console.log(response.data);
      dispatch(commissionRateSuccess(response.data?.commission));
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

  async fetchAllAdmin(dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.get('/admin/all-admins');
      const data = response.data;
      dispatch(allAdminSuccess(data));
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async createAdminWallet(dispatch) {
    try {
      dispatch(adminCurrencyStart());
      const response = await axiosPrivate.post('/wallet/admin/wallet/create-admin-user-wallet');
      const data = response.data;
      dispatch(adminCurrencySuccess(data))
      toast.success('Wallets created successfully!!!');
    } catch (err) {
      if (!err.response) {
        dispatch(adminCurrencyFailure('No Server Response'));
      } else {
        dispatch(adminCurrencyFailure(err.response.data.message));
      }
    }
  };

  async fetchPouchWallets(currency, dispatch) {
    try {
      dispatch(adminCurrencyStart());
      const response = await axiosPrivate.get(`/wallet/get-system-wallets?currency=${currency}`);
      const data = response.data;
      dispatch(adminCurrencySuccess(data));
    } catch (err) {
      if (!err.response) {
        dispatch(adminCurrencyFailure('No Server Response'));
      } else {
        dispatch(adminCurrencyFailure(err.response.data.message));
      }
    }
  };

  async fetchPouchTransactions(date, type, status, page, limit, dispatch) {
    try {
      dispatch(pouchTransactionStart());
      const response = await axiosPrivate.get(`/transaction/admin/all/system-transactions?date=${date}&transactionType=${type}&status=${status}&page=${page}&limit=${limit}`);
      const data = response.data;
      dispatch(pouchTransactionSuccess(data));
    } catch (err) {
      if (!err.response) {
        dispatch(pouchTransactionFailure('No Server Response'));
      } else {
        dispatch(pouchTransactionFailure(err.response.data.message));
      }
    }
  };

  async fundAdminWallet(formData, dispatch) {
    try {
      dispatch(fundingWalletStart());
      const response = await axiosPrivate.post('/wallet/fund-system-admin-wallet',
        JSON.stringify(formData)
      );
      const data = response.data.data.link;
      console.log('new link: ', data);
      // window.location.href = data;
      dispatch(fundingWalletSuccess(data));
      toast.success(`${formData.currency} wallet credited successfully`);
    } catch (err) {
      if (!err.response) {
        dispatch(fundingWalletFailure('No Server Response'));
      } else {
        dispatch(fundingWalletFailure(err.response.data.message));
      }
    }
  };
}
  
export default AdminService;