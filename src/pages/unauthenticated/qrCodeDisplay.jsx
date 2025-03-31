import { useState } from 'react';
import useAxiosPrivate from "../../services/hooks/useAxiosPrivate";
import Button from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../services/api/authApi';
import { useLocation } from 'react-router-dom';

const QRCodeDisplay = ({ qrCodeData, userId }) => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const authService = new AuthService(axiosPrivate, location);
    const { isVerifyingCode } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (token.length < 6 || token.length > 6) return;

        await authService.verifySecret(userId, token, dispatch);
    }

    if (!qrCodeData) {
        return <p>Loading QR Code...</p>
    }

    return (
        <div className='flex flex-col items-center space-y-4'>
            <h2>Scan this QR Code and enter the code below to enable 2FA</h2>
            <img 
                src={qrCodeData}
                alt="QR Code"
                style={{width: '250px', height: '250px'}}
            />

            <input
                type="text"
                maxLength={6}
                minLength={6}
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className='w-full h-12 rounded-sm border border-primary outline-none mt-5'
            />
            <Button
                onClick={handleSubmit}
                disabled={isVerifyingCode}
            >
                {isVerifyingCode ? 'Submitting ....' : 'Submit'}
            </Button>
        </div>
    );
}

export default QRCodeDisplay;