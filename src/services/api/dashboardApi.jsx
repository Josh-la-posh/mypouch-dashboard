import { axiosPrivate } from "./axios";
import { adminActivitiesStatFailure, adminActivitiesStatStart, adminActivitiesStatSuccess, rateFailure, rateStart, rateSuccess, statFailure, statStart, statSuccess, transactionFailure, transactionStart, transactionStatFailure, transactionStatStart, transactionStatSuccess, transactionSuccess } from "../../redux/slices/dashboardSlice";

class DashboardService {
    constructor(location, navigate) {
        this.location = location;
        this.navigate = navigate;
    }

    async fetchtransactions(dispatch) {  
      try {
        dispatch(transactionStart());
        const response = await axiosPrivate.get(`/transaction/admin/all/transactions?page=1&limit=5`);
        
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

    async fetchtCurrencyRates(currency, dispatch) {  
      try {
        dispatch(rateStart());
        const response = await axiosPrivate.get(`/wallet/fx-rates?baseCurrency=${currency}`);
        
        const data = response.data.conversion_rates;
        const requiredCurrencies = ['USD', 'NGN', 'CAD', 'EUR', 'GBP'];

        const filteredCurrencies = Object.fromEntries(
          requiredCurrencies.map((cur) => [cur, data[cur]]));

        dispatch(rateSuccess(filteredCurrencies));
      } catch (err) {
        if (!err.response) {
          dispatch(rateFailure('No Server Response'));
        } else {
            dispatch(rateFailure(err.response.data.messsage));
        }
      }
    };

    async fetchUserStat(dispatch) {  
      try {
        dispatch(statStart());

        const response = await axiosPrivate.get('/users/admin/users/stat');
        
        const data = response.data;

        dispatch(statSuccess(data));

        this.fetchTransactionStat(dispatch);
        this.fetchAdminActivities(dispatch);
        
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

        dispatch(transactionStatSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(transactionStatFailure('No Server Response'));
        } else {
            dispatch(transactionStatFailure(err.response.data.message));
        }
      }
    };

    async fetchAdminActivities(dispatch) {  
      try {
        dispatch(adminActivitiesStatStart());

        const response = await axiosPrivate.get('/admin/acticities-admin');
        
        const data = response.data;

        dispatch(adminActivitiesStatSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(adminActivitiesStatFailure('No Server Response'));
        } else {
            dispatch(adminActivitiesStatFailure(err.response.data.message));
        }
      }
    };
}
  
export default DashboardService;