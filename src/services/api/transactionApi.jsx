import { toast } from "react-toastify";
import { transactionFailure, transactionStart, transactionSuccess, walletFailure, walletStart, walletSuccess, limitsFetchStart, limitsFetchSuccess, limitsFetchFailure, createLimitStart, createLimitSuccess, createLimitFailure } from "../../redux/slices/transactionSlice";
import { axiosPrivate } from "./axios";

class TransactionService {
    constructor(location) {
        this.location = location;
    }

    // Refactored to accept a filters object for extensibility & parity with user transactions
    async fetchtransactions(filters, dispatch) {
      try {
        dispatch(transactionStart());
        const { date = '', transactionType = '', search = '', status = '', currency = '', page = 1, limit = 10 } = filters || {};
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (transactionType) params.append('transactionType', transactionType);
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (currency) params.append('currency', currency);
        params.append('page', page);
        params.append('limit', limit);
        const response = await axiosPrivate.get(`/transaction/admin/all/transactions?${params.toString()}`);
        const data = response.data;
        dispatch(transactionSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(transactionFailure('No Server Response'));
        } else {
          dispatch(transactionFailure(err.response.data.messsage));
        }
      }
    };

    async exportTransactionsExcel(filters) {
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
        const response = await axiosPrivate.get(`/transaction/admin/all/transaction/excel?${params.toString()}` , { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        a.download = `all-transactions-export-${timestamp}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Export successful');
      } catch (err) {
        if (!err.response) {
          toast.error('Export failed: No Server Response');
        } else {
          toast.error(`Export failed: ${err.response.data.messsage || 'Server Error'}`);
        }
      }
    }

    async fetchWallets(dispatch) {
      try {
        dispatch(walletStart());
        const response = await axiosPrivate.get(`/wallet/wallet-balance`);        
        const data = response.data.totals;
        dispatch(walletSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(walletFailure());
          toast.error('No Server Response');
        } else {
          dispatch(walletFailure());
          toast.error(err.response.data.messsage);
        }
      }
    };

  // Fetch global transaction limits: endpoint returns an ARRAY of objects, each with daily & monthly values.
  async fetchTransactionLimits(dispatch) {
    try {
      dispatch(limitsFetchStart());
      const response = await axiosPrivate.get('/users/get-global-limit');
      const raw = Array.isArray(response?.data) ? response.data : [];
      const limitsArray = raw.flatMap(item => {
        const base = {
          transactionType: item.transactionType,
          currency: item.currency,
          createdDate: item.lastModifiedDate || item.createdDate || new Date().toISOString(),
          status: item.isActive ? 'Active' : 'Inactive'
        };
        return [
          { ...base, amount: parseFloat(item.dailyLimit), period: 'daily' },
          { ...base, amount: parseFloat(item.monthlyLimit), period: 'monthly' },
        ];
      });
      dispatch(limitsFetchSuccess(limitsArray));
    } catch (err) {
      const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to fetch global limits');
      dispatch(limitsFetchFailure(msg));
      toast.error(msg);
    }
  }

    // Upsert global transaction limit (daily & monthly together)
    async createTransactionLimit({ transactionType, currency, dailyLimit, monthlyLimit }, dispatch) {
        try {
            dispatch(createLimitStart());
            const body = { transactionType, currency, dailyLimit: Number(dailyLimit), monthlyLimit: Number(monthlyLimit) };
            const response = await axiosPrivate.post('/users/upset-global-limit', JSON.stringify(body));
            const result = response?.data;
            // Backend returns the combined limit object; normalize like fetch
            dispatch(createLimitSuccess(result));
            toast.success('Global transaction limit updated');
            await this.fetchTransactionLimits(dispatch);
        } catch (err) {
            const msg = !err.response ? 'No Server Response' : (err.response.data?.message || 'Failed to update global limit');
            dispatch(createLimitFailure(msg));
            toast.error(msg);
        }
    }
}
  
export default TransactionService;