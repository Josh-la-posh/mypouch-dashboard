import { toast } from "react-toastify";
import axios, { axiosPrivate } from "./axios";
import { login2faStart, login2faSuccess, loginFailure, loginQrStart, loginQrSuccess, loginStart, loginSuccess, loginVerifyQrCodeStart, loginVerifyQrCodeSuccess } from "../../redux/slices/authSlice";

class AuthService {
    constructor(axiosPrivate, location) {
      this.axiosPrivate = axiosPrivate;
      this.location = location;
    }

    async submitLogin(formData, setAuth, dispatch) {
      dispatch(loginStart());
      setAuth({});
  
      try {
        const response = await axios.post('/admin/signin',
          JSON.stringify(formData)
        );
        const userId = response.data.userId;
        const data = response.data;
        dispatch(loginSuccess(data));

        if (response.data.isTwoFactorEnabled === false) {
          await this.generateSecret(userId, dispatch);
        }

      } catch (err) {
        if (!err.response) {
          toast.error('No response from server');
            dispatch(loginFailure());
        } else {
          toast.error(err.response.data.message);
          dispatch(loginFailure(err.response.data.message));
        }
      }
    };

    async generateSecret(id, dispatch) {
      dispatch(loginQrStart());
      try {
        const response = await axios.post(`/admin/generate-secret/${id}`);
        const data = response.data;
        dispatch(loginQrSuccess(data));

      } catch (err) {
        if (!err.response) {
          toast.error('No response from server');
            dispatch(loginFailure());
        } else {
          toast.error(err.response.data.message);
          dispatch(loginFailure(err.response.data.message));
        }
      }
    };

    async verifySecret(id, token, dispatch) {
      dispatch(loginVerifyQrCodeStart());
      try {
        const response = await axios.post(`/admin/verify-secret/${id}`,
          JSON.stringify({token})
        );
        const data = {
          'userId': id,
          'isTwoFactorEnabled': true
        };
        dispatch(loginVerifyQrCodeSuccess(response.data));
        if (response.data == false) return toast.error('Invalid code');
        dispatch(loginSuccess(data));
      } catch (err) {
        if (!err.response) {
          toast.error('No response from server');
            dispatch(loginFailure());
        } else {
          if (err.response.status === 400) {
            toast.error(err.response.data.message);
            dispatch(loginFailure(err.response.data.message));
          } else {
            toast.error('Login failed');
            dispatch(loginFailure('Login failed'));
          }
        }
      }
    };

    async login2fa(id, token, setAuth, navigate, dispatch) {
      dispatch(login2faStart());
      try {
        const response = await axios.post(`/admin/login-2fa/${id}`,
          JSON.stringify({token})
        );
        const data = response.data;

        await this.fetchCurrentUser(data, setAuth, navigate, dispatch);
        dispatch(login2faSuccess(id));

      } catch (err) {
        if (!err.response) {
          toast.error('No response from server');
            dispatch(loginFailure());
        } else {
          if (err.response.status === 400) {
            toast.error(err.response.data.message);
            dispatch(loginFailure(err.response.data.message));
          } else {
            toast.error('Login failed');
            dispatch(loginFailure('Login failed'));
          }
        }
      }
    };

    async fetchCurrentUser(token, setAuth, navigate, dispatch) {  
      
      const access = token?.access_token;
      try {
        const response = await this.axiosPrivate.get(
          '/admin/current-user',
          {
            headers: {Authorization: `Bearer ${access}`}
          }
        );
        const data = response.data;  

        setAuth({token, data});
        toast("Login successful", {type: 'success'});
        const from = this.location.state?.from?.pathname || '/';
        navigate(from, {replace: true});
        
      } catch (err) {
        if (!err.response) {
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