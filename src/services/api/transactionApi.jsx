import { toast } from "react-toastify";
import { transactionFailure, transactionStart, transactionSuccess, walletFailure, walletStart, walletSuccess } from "../../redux/slices/transactionSlice";
import { axiosPrivate } from "./axios";

class TransactionService {
    constructor(location) {
        this.location = location;
    }

    async fetchtransactions(date, transactionType, search, status, page, limit, dispatch) {
      try {
        dispatch(transactionStart());
        const response = await axiosPrivate.get(`/transaction/admin/all/transactions?date=${date}&transactionType=${transactionType}&search=${search}&status=${status}&page=${page}&limit=${limit}`);
        
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