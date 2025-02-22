import { toast } from "react-toastify";
import { userAccountSuccess, userActivitySuccess, userDetailFailure, userDetailStart, userDetailSuccess, userFailure, userStart, userSuccess, userTransactionFailure, userTransactionStart, userTransactionSuccess, userUpdateStart, userVerificationSuccess } from "../../redux/slices/userSlice";
import { axiosPrivate } from "./axios";

class UserService {
    constructor(location) {
        this.location = location;
    }

    async fetchUsers(search, status, page, limit, dispatch) {
      try {
        dispatch(userStart());
        const response = await axiosPrivate.get(
          `/users/admin/users?search=${search}&status=${status}&page=${page}&limit=${limit}`);
        
        const data = response.data;
        dispatch(userSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
            dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchUserDetail(id, dispatch) {  
      try {
        dispatch(userDetailStart());

        const response = await axiosPrivate.get(`/users/admin/user/${id}`);
        
        const data = response.data;
        dispatch(userDetailSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userDetailFailure('No Server Response'));
        } else {
            dispatch(userDetailFailure(err.response.data.message));
        }
      }
    };

    async updateUserDetail(id,formData, dispatch) {  
      try {
        dispatch(userUpdateStart());

        const response = await axiosPrivate.patch(`/users/${id}`,
          JSON.stringify(formData)
        );
        toast.success('User data updated successfully!!!');
        this.fetchUserDetail(id, dispatch);
      } catch (err) {
        if (!err.response) {
          dispatch(userDetailFailure('No Server Response'));
        } else {
            dispatch(userDetailFailure(err.response.data.message));
        }
      }
    };

    async fetchUserAccount(id, dispatch) {  
      try {
        dispatch(userStart());

        const response = await axiosPrivate.get(`/wallet/admin/wallet/${id}`);
        
        const data = response.data;
        dispatch(userAccountSuccess(data));
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
            dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchUserTraansactions(id, date, status, page, limit, dispatch) {  
      try {
        dispatch(userTransactionStart());

        const response = await axiosPrivate.get(`/transaction/admin/${id}?date=${date}&status=${status}&page=${page}&limit=${limit}`);
        
        const data = response.data;
        dispatch(userTransactionSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userTransactionFailure('No Server Response'));
        } else {
            dispatch(userTransactionFailure(err.response.data.message));
        }
      }
    };

    async fetchUserActivities(id, dispatch) {  
      try {
        dispatch(userStart());

        const response = await axiosPrivate.get(`/admin/user-activities/${id}`);
        
        const data = response.data;
        dispatch(userActivitySuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
          dispatch(userFailure(err.response.data.message));
        }
      }
    };

    async fetchUserVerification(id, dispatch) {  
      try {
        dispatch(userStart());
        const response = await axiosPrivate.get(`/users/verification/${id}`);
        
        const data = response.data;
        dispatch(userVerificationSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userFailure('No Server Response'));
        } else {
          dispatch(userFailure(err.response.data.message));
        }
      }
    };
}
  
export default UserService;