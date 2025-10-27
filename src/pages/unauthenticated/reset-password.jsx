import { useCallback, useEffect, useMemo, useState } from 'react';
import InputField from '../../components/ui/input';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PasswordRecoveryService from '../../services/api/passwordRecoveryApi';
import { toast } from 'react-toastify';

const COUNTDOWN_SECONDS = 120; // 2 minutes

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();
  const passwordRecoveryService = useMemo(() => new PasswordRecoveryService(), []);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const canResend = secondsLeft === 0;

  const startCountdown = useCallback(() => {
    setSecondsLeft(COUNTDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const ticker = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(ticker);
  }, [secondsLeft]);

  const formatTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = async () => {
    if (!email.trim()) return toast.error('Email missing');
    if (!canResend) return;
    setResendLoading(true);
    try {
      await passwordRecoveryService.generateOtp(email.trim());
      startCountdown();
    } catch {
      // errors toasted in service
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Email missing');
    if (otp.trim().length !== 6) return toast.error('OTP must be 6 digits');
    if (!newPassword) return toast.error('Enter a new password');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await passwordRecoveryService.resetPassword(email.trim(), otp.trim(), newPassword);
      navigate('/login');
    } catch {
      // service handles toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light h-screen flex justify-center items-center">
      <div className="bg-primary/[.7] p-8 w-md md:w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Reset Password</h1>
        <p className='text-center text-white/80 text-sm mb-6'>OTP was sent to: <span className='font-semibold'>{email || 'No email provided'}</span></p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="OTP"
            id="otp"
            type="text"
            placeholder="6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
            required
            textColor='text-white'
          />
          <InputField
            label="New Password"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            textColor='text-white'
          />
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            textColor='text-white'
          />
          <Button
            onClick={loading ? null : handleSubmit}
            variant='primary'
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        <Button
            type='button'
            onClick={canResend && !resendLoading ? handleResendOtp : null}
            variant={canResend ? 'primary' : 'disabled'}
            disabled={!canResend || resendLoading}
        >
            {resendLoading ? 'Sending...' : canResend ? 'Resend OTP' : `Resend in ${formatTime()}`}
        </Button>
        <div className="w-full flex justify-center mt-4">
            <TextButton onClick={() => navigate('/login')} variant='primary'>Back to Login</TextButton>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
