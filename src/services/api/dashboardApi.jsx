import { axiosPrivate } from "./axios";
import { statFailure, statStart, statSuccess, transactionStatFailure, transactionStatStart, transactionStatSuccess } from "../../redux/slices/dashboardSlice";

class DashboardService {
    constructor(location, navigate) {
        this.location = location;
        this.navigate = navigate;
    }

    async fetchUserStat(dispatch) {  
      try {
        dispatch(statStart());

        const response = await axiosPrivate.get('/users/admin/users/stat');
        
        const data = response.data;
        console.log('user data: ', data);

        dispatch(statSuccess(data));

        this.fetchTransactionStat(dispatch);
        
      } catch (err) {
        if (!err.response) {
          dispatch(statFailure('No Server Response'));
        } else {
            dispatch(statFailure(err.response.data.message));
        }
      }
    };

    async fetchTransactionStat(dispatch) {  
      try {
        dispatch(transactionStatStart());

        const response = await axiosPrivate.get('/transaction/admin/trans/stat');
        
        const data = response.data;
        console.log('user data: ', data);

        dispatch(transactionStatSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(transactionStatFailure('No Server Response'));
        } else {
            dispatch(transactionStatFailure(err.response.data.message));
        }
      }
    };
}
  
export default DashboardService;