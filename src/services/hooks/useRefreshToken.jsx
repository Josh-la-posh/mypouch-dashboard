import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const token = auth.token.refresh_token;
        const response = await axios.post('/auth/token/refresh',
            JSON.stringify({token}),
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );
        setAuth(prev => {
            return { ...prev, token: response.data }
        });
        return response.data.access_token;
    }
    return refresh;
}

export default useRefreshToken;