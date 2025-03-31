import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (auth?.token?.access_token) {
          config.headers['Authorization'] = `Bearer ${auth.token.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, // If the response is successful, just return it
      async (error) => {
        const prevRequest = error.config;
        
        // Handle the 401 error for token refresh
        if (error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; // Mark that the request has been retried
          try {
            const newAccessToken = await refresh(); // Refresh token
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Set new token in headers
            return axiosPrivate(prevRequest); // Retry the original request with the new token
          } catch (err) {
            dispatch(logout());
            navigate('/login', { state: { from: location }, replace: true });
            return Promise.reject(err); // Propagate the error if refreshing fails
          }
        }

        // If the error is not a 401 or we already tried to resend, just reject it
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptors when component unmounts
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, navigate, dispatch, location]);

  return axiosPrivate;
};

export default useAxiosPrivate;
