import { toast } from "react-toastify";
import axios, { axiosPrivate } from "./axios";
import { loginFailure, loginStart, loginSuccess } from "../../redux/slices/authSlice";

class AuthService {
    constructor(axiosPrivate, location) {
      this.axiosPrivate = axiosPrivate;
      this.location = location;
    }

    async submitLogin(formData, setAuth, navigate, dispatch) {
      dispatch(loginStart());
      setAuth({});
  
      try {
        const response = await axios.post('/admin/signin',
          JSON.stringify(formData)
        );
        
        const token = response.data;
        const access = token?.access_token;
        setAuth({token});

        await this.fetchCurrentUser(access, setAuth, navigate, dispatch);

      } catch (err) {
        if (!err.response) {
            dispatch(loginFailure('No response from server'));
        } else {
          if (err.response.status === 400) {
            console.log('The error is ', err.response);
            dispatch(loginFailure(err.response.data.message));
          } else {
            dispatch(loginFailure('Login failed'));
          }
        }
      }
    };

    async fetchCurrentUser(token, setAuth, navigate, dispatch) {  
      try {
        const response = await this.axiosPrivate.get(
          '/admin/current-user',
          {
            headers: {Authorization: `Bearer ${token}`}
          }
        );
        const data = response.data;  
        setAuth((prev) => ({
            ...prev,
            data
        }));
        dispatch(loginSuccess(data));
        toast("Login successful", {type: 'success'});
        
        const from = this.location.state?.from?.pathname || '/';
        navigate(from, {replace: true});
        
      } catch (err) {
        if (!err.response) {
          console.response('Error seen ', err.response);
          dispatch(loginFailure('No Server Response'));
        } else {
          if (err.response.status === 401) {
            dispatch(loginFailure(err.response.data.message));
          } else {
            dispatch(loginFailure('Login Failed'));
          }
        }
      }
    };
}
  
export default AuthService;