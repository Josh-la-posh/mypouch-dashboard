import { toast } from "react-toastify";
import { transactionFailure, transactionStart, transactionSuccess, walletFailure, walletStart, walletSuccess } from "../../redux/slices/transactionSlice";
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
}
  
export default TransactionService;