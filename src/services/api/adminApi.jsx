import { axiosPrivate } from "./axios";
import { addAdminSuccess, adminCurrencyFailure, adminCurrencyStart, adminCurrencySuccess, adminFailure, adminStart, adminSuccess, allAdminSuccess, changePasswordSuccess, currencySuccess, exchangeLimitSuccess, fundingWalletFailure, fundingWalletStart, fundingWalletSuccess, suspiciousActivitiesSuccess, updateRateStart, updateRateSuccess } from "../../redux/slices/adminSlice";
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
      await axiosPrivate.put(`/admin/update-admin&id=${id}`,
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

  async changePassword(formData, dispatch) {
    try {
      dispatch(adminStart());
      const response = await axiosPrivate.post(
        '/admin/change-password',
          JSON.stringify(formData),
        );
        toast.success('Password changed successfully');
        dispatch(changePasswordSuccess())
    } catch (err) {
      if (!err.response) {
        toast.error('No Server Response');
        return dispatch(adminFailure('No Server Response'));
      } else {
        if (err.response.status === 400) {
          console.log('The error is ', err.response);
          dispatch(loginFailure(err.response.data.message));
        } else {
          dispatch(adminFailure(err.response.data.message));
          toast.error(err.response.data.message);
        }
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
      const response = await axiosPrivate.post('/admin/wallet/create-admin-user-wallet');
      toast.success('Wallets created successfully!!!');
      this.fetchAdminWallets('', dispatch);
    } catch (err) {
      if (!err.response) {
        dispatch(adminFailure('No Server Response'));
      } else {
        dispatch(adminFailure(err.response.data.message));
      }
    }
  };

  async fetchAdminWallets(currency, dispatch) {
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

  async fundAdminWallet(formData, dispatch) {
    try {
      dispatch(fundingWalletStart());
      const response = await axiosPrivate.post('/wallet/fund-system-admin-wallet',
        JSON.stringify(formData)
      );
      const data = response.data.data.link;
      console.log('new link: ', data);
      // window.location.href = data;
      // this.fetchAdminWallets('', dispatch);
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