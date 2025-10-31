import { axiosPrivate } from "./axios";
import { activateAdminStart, activateAdminSuccess, addAdminSuccess, adminCurrencyFailure, adminCurrencyStart, adminCurrencySuccess, adminFailure, adminRoleSuccess, adminStart, adminSuccess, allAdminSuccess, commissionRateSuccess, currencySuccess, exchangeLimitSuccess, fundingWalletFailure, fundingWalletStart, fundingWalletSuccess, pouchTransactionFailure, pouchTransactionStart, pouchTransactionSuccess, suspiciousActivitiesSuccess, updateRateStart, updateRateSuccess, manualFundingProvidersStart, manualFundingProvidersSuccess, manualFundingProvidersFailure, initiateManualFundingStart, initiateManualFundingSuccess, initiateManualFundingFailure, faqFetchStart, faqFetchSuccess, faqFetchFailure, faqCreateStart, faqCreateSuccess, faqCreateFailure, faqUpdateStart, faqUpdateSuccess, faqUpdateFailure, faqDeleteStart, faqDeleteSuccess, faqDeleteFailure, currencyHistoryStart, currencyHistorySuccess, currencyHistoryFailure, pendingManualFundingStart, pendingManualFundingSuccess, pendingManualFundingFailure, reviewManualFundingStart, reviewManualFundingSuccess, reviewManualFundingFailure, manualFundingAllStart, manualFundingAllSuccess, manualFundingAllFailure } from "../../redux/slices/adminSlice";
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

  async activateAdmin(id, dispatch) {  
    try {
      dispatch(activateAdminStart());
      const response = await axiosPrivate.put(`/admin/activate-admin/${id}`);
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
  await axiosPrivate.post('/admin/exchange-rate-bulk-create',
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
  await axiosPrivate.post('/admin/exchange-rate-bulk-create',
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
  await axiosPrivate.delete(`/admin/exchange-rate/${id}`);
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
  await axiosPrivate.post('/admin/mark-up',
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
  await axiosPrivate.post('/admin/commission-rate',
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

  async fetchExchangeRateHistory(params, dispatch) {
    try {
      dispatch(currencyHistoryStart());
      const { adminId='', toCurrency='', fromCurrency='', endDate='', startDate='', page=1, limit=10 } = params || {};
      const searchParams = new URLSearchParams();
      if (adminId) searchParams.append('adminId', adminId);
      if (toCurrency) searchParams.append('toCurrency', toCurrency);
      if (fromCurrency) searchParams.append('fromCurrency', fromCurrency);
      if (startDate) searchParams.append('startDate', startDate);
      if (endDate) searchParams.append('endDate', endDate);
      searchParams.append('page', page);
      searchParams.append('limit', limit);
      const response = await axiosPrivate.get(`/admin/exchange-rate-history?${searchParams.toString()}`);
      const data = response?.data;
      // Normalize expected shape: { totalPages, payloadSize, hasNext, content, currentPage, totalRecords }
      const normalized = Array.isArray(data) ? data : {
        content: data?.content || [],
        currentPage: data?.currentPage ?? page,
        totalPages: data?.totalPages ?? 1,
        payloadSize: data?.payloadSize ?? (data?.content?.length || 0),
        hasNext: data?.hasNext ?? false,
        totalRecords: data?.totalRecords ?? (data?.content?.length || 0),
      };
      dispatch(currencyHistorySuccess(normalized));
    } catch (err) {
      if (!err.response) {
        dispatch(currencyHistoryFailure('No Server Response'));
      } else {
        dispatch(currencyHistoryFailure(err.response.data.message || 'Failed to fetch history'));
      }
    }
  }

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

  async fetchPendingManualFunding(dispatch) {
    try {
      dispatch(pendingManualFundingStart());
      const response = await axiosPrivate.get('/wallet/pending-approval-manual-funding');
      const data = response?.data;
      if (!Array.isArray(data)) {
        // Assume maybe wrapped object {content: []}
        const list = data?.content || [];
        dispatch(pendingManualFundingSuccess(list));
      } else {
        dispatch(pendingManualFundingSuccess(data));
      }
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to fetch pending manual funding approvals');
      dispatch(pendingManualFundingFailure(msg));
      toast.error(msg);
    }
  }

  async reviewManualFunding(id, status, dispatch) {
    try {
      dispatch(reviewManualFundingStart(id));
      await axiosPrivate.post(`/wallet/review-manual-fund/${id}`, JSON.stringify({ status }));
      dispatch(reviewManualFundingSuccess(id));
      toast.success(`Request ${status === 'approve' ? 'approved' : 'rejected'}`);
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to review funding request');
      dispatch(reviewManualFundingFailure(msg));
      toast.error(msg);
    }
  }

  async fetchAllManualFunding({ search='', currency='', status='', page=1, limit=10 }, dispatch) {
    try {
      dispatch(manualFundingAllStart());
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (currency) params.append('currency', currency);
      if (status) params.append('status', status);
      params.append('page', page);
      params.append('limit', limit);
      const response = await axiosPrivate.get(`/wallet/manual-funding/all?${params.toString()}`);
      dispatch(manualFundingAllSuccess(response?.data));
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to fetch manual funding records');
      dispatch(manualFundingAllFailure(msg));
      toast.error(msg);
    }
  }

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

  async fundNairaFlutterwave(amount, dispatch) {
    try {
      dispatch(fundingWalletStart());
      const response = await axiosPrivate.post('/wallet/fund-system-admin-wallet/naira/flutterwave',
        JSON.stringify({ amount: String(amount) })
      );
      const link = response?.data?.data?.link;
      if (!link) throw new Error('No payment link returned');
      dispatch(fundingWalletSuccess(link));
      toast.success('Flutterwave payment link generated');
    } catch (err) {
      if (!err.response) {
        dispatch(fundingWalletFailure('No Server Response'));
        toast.error('No Server Response');
      } else {
        const msg = err.response.data?.message || 'Unable to generate Flutterwave link';
        dispatch(fundingWalletFailure(msg));
        toast.error(msg);
      }
    }
  };

  async fundNairaPaystack(amount, dispatch) {
    try {
      dispatch(fundingWalletStart());
      const response = await axiosPrivate.post('/wallet/fund-system-admin-wallet/naira/paystack',
        JSON.stringify({ amount: String(amount) })
      );
      const link = response?.data?.data?.authorization_url;
      if (!link) throw new Error('No authorization URL returned');
      dispatch(fundingWalletSuccess(link));
      toast.success('Paystack authorization URL generated');
    } catch (err) {
      if (!err.response) {
        dispatch(fundingWalletFailure('No Server Response'));
        toast.error('No Server Response');
      } else {
        const msg = err.response.data?.message || 'Unable to generate Paystack link';
        dispatch(fundingWalletFailure(msg));
        toast.error(msg);
      }
    }
  };

  async fetchManualFundingProviders(dispatch) {
    try {
      dispatch(manualFundingProvidersStart());
      const response = await axiosPrivate.get('/wallet/list-all-providers');
      const data = response?.data;
      if (!Array.isArray(data)) throw new Error('Unexpected providers response');
      dispatch(manualFundingProvidersSuccess(data));
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to fetch providers');
      dispatch(manualFundingProvidersFailure(msg));
      toast.error(msg);
    }
  }

  async initiateManualFunding({ amount, currency, provider }, dispatch) {
    try {
      dispatch(initiateManualFundingStart());
      const body = { amount: Number(amount), currency, provider };
      const response = await axiosPrivate.post('/wallet/initiate-manual-funding', JSON.stringify(body));
      const message = response?.data?.message || 'Manual funding initiated';
      dispatch(initiateManualFundingSuccess(message));
      toast.success(message);
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to initiate manual funding');
      dispatch(initiateManualFundingFailure(msg));
      toast.error(msg);
    }
  }

  // FAQ / Terms & Conditions endpoints
  async fetchFaq(dispatch) {
    try {
      dispatch(faqFetchStart());
      const response = await axiosPrivate.get('/admin/terms-conditions');
      const data = response?.data;
      // Expecting array
      if (!Array.isArray(data)) throw new Error('Unexpected FAQ response');
      dispatch(faqFetchSuccess(data));
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to fetch FAQ');
      dispatch(faqFetchFailure(msg));
      toast.error(msg);
    }
  }

  async createFaq({ title, content, isActive }, dispatch) {
    try {
      dispatch(faqCreateStart());
      const response = await axiosPrivate.post('/admin/terms-conditions/create', JSON.stringify({ title, content, isActive }));
      const created = response?.data;
      dispatch(faqCreateSuccess(created));
      toast.success('FAQ created');
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to create FAQ');
      dispatch(faqCreateFailure(msg));
      toast.error(msg);
    }
  }

  async updateFaq(id, { title, content, isActive }, dispatch) {
    try {
      dispatch(faqUpdateStart());
      const response = await axiosPrivate.put(`/admin/terms-conditions/${id}`, JSON.stringify({ title, content, isActive }));
      const updated = response?.data;
      dispatch(faqUpdateSuccess(updated));
      toast.success('FAQ updated');
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to update FAQ');
      dispatch(faqUpdateFailure(msg));
      toast.error(msg);
    }
  }

  async deleteFaq(id, dispatch) {
    try {
      dispatch(faqDeleteStart());
      await axiosPrivate.delete(`/admin/terms-conditions/${id}`);
      dispatch(faqDeleteSuccess(id));
      toast.success('FAQ deleted');
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to delete FAQ');
      dispatch(faqDeleteFailure(msg));
      toast.error(msg);
    }
  }
}
  
export default AdminService;