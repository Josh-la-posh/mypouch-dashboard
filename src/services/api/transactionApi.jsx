import { transactionFailure, transactionStart, transactionSuccess } from "../../redux/slices/transactionSlice";
import { axiosPrivate } from "./axios";

class TransactionService {
    constructor(location, navigate) {
        this.location = location;
        this.navigate = navigate;
    }

    async fetchtransactions(date, status, page, limit, dispatch) {
      try {
        dispatch(transactionStart());
        const response = await axiosPrivate.get(`/transaction/admin/all/transactions?date=${date}&status=${status}&page=${page}&limit=${limit}`);
        
        const data = response.data;
        console.log('user transactions: ', data);

        dispatch(transactionSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(transactionFailure('No Server Response'));
        } else {
            dispatch(transactionFailure(err.response.data.messsage));
        }
      }
    };
}
  
export default TransactionService;