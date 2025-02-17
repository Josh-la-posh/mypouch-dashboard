import { userDetailFailure, userDetailStart, userDetailSuccess, userFailure, userStart, userSuccess } from "../../redux/slices/userSlice";
import { axiosPrivate } from "./axios";

class UserService {
    constructor(location) {
        this.location = location;
    }

    async fetchUsers(search, status, page, limit, dispatch) {
      console.log('the result is ', search);
      try {
        dispatch(userStart());
        const response = await axiosPrivate.get(
          `/users/admin/users?search=${search}&status=${status}&page=${page}&limit=${limit}`       );
        
        const data = response.data;
        console.log('user data: ', data);
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
        console.log('user data: ', data);
        dispatch(userDetailSuccess(data));
        
      } catch (err) {
        if (!err.response) {
          dispatch(userDetailFailure('No Server Response'));
        } else {
            dispatch(userDetailFailure(err.response.data.message));
        }
      }
    };
}
  
export default UserService;