import { axiosPrivate } from "./axios";
import { adminActivitiesStatFailure, adminActivitiesStatStart, adminActivitiesStatSuccess, rateFailure, rateStart, rateSuccess, statFailure, statStart, statSuccess, transactionFailure, transactionStart, transactionStatFailure, transactionStatStart, transactionStatSuccess, transactionSuccess, userBalanceStart, userBalanceSuccess, userBalanceFailure, pouchBalanceStart, pouchBalanceSuccess, pouchBalanceFailure } from "../../redux/slices/dashboardSlice";

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
        const response = await axiosPrivate.get(`/wallet/best-rates?currency=${currency}`);
        /* New response shape (array): [ { productAlias, source, destination, value, fetchedAt, fee?, feeCurrency? }, ... ]
           We will normalize into array of objects as-is, and also compute a displayValue for 1 source -> destination. */
        const data = Array.isArray(response.data) ? response.data : (response.data?.rates || []);

        // Sort by destination then productAlias for consistent ordering
        const normalized = data.map(r => ({
          productAlias: r.productAlias,
          pair: `${r.source}/${r.destination}`,
          source: r.source,
          destination: r.destination,
          value: r.value, // already numeric
          fee: r.fee || null,
          feeCurrency: r.feeCurrency || null,
          fetchedAt: r.fetchedAt,
        })).sort((a,b) => a.destination.localeCompare(b.destination) || a.productAlias.localeCompare(b.productAlias));

        dispatch(rateSuccess(normalized));
      } catch (err) {
        if (!err.response) {
          dispatch(rateFailure('No Server Response'));
        } else {
          dispatch(rateFailure(err.response.data.message || err.response.data.messsage || 'Failed to fetch rates'));
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

    async fetchUserBalance(dispatch) {
      try {
        dispatch(userBalanceStart());
        const response = await axiosPrivate.get('/wallet/wallet-balance');
        // Response shape per spec: { totals: [...], summary: {...} }
        dispatch(userBalanceSuccess(response.data));
      } catch (err) {
        if (!err.response) {
          dispatch(userBalanceFailure('No Server Response'));
        } else {
          dispatch(userBalanceFailure(err.response.data.message || 'Failed to load user balance'));
        }
      }
    }

    async fetchPouchBalance(dispatch) {
      try {
        dispatch(pouchBalanceStart());
        const response = await axiosPrivate.get('/wallet/get-system-wallets');
        // Response shape per spec: array of system wallets
        dispatch(pouchBalanceSuccess(response.data));
      } catch (err) {
        if (!err.response) {
          dispatch(pouchBalanceFailure('No Server Response'));
        } else {
          dispatch(pouchBalanceFailure(err.response.data.message || 'Failed to load pouch balance'));
        }
      }
    }
}
  
export default DashboardService;