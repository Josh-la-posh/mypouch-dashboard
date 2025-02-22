import { axiosPrivate } from "./axios";
import { adminActivitiesStatFailure, adminActivitiesStatStart, adminActivitiesStatSuccess, statFailure, statStart, statSuccess, transactionStatFailure, transactionStatStart, transactionStatSuccess } from "../../redux/slices/dashboardSlice";

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