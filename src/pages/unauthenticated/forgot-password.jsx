import { useState } from 'react';
import InputField from '../../components/ui/input';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import PasswordRecoveryService from '../../services/api/passwordRecoveryApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const passwordRecoveryService = new PasswordRecoveryService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await passwordRecoveryService.generateOtp(email.trim());
      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch {
      // errors toasted in service
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light h-screen flex justify-center items-center">
      <div className="bg-primary/[.7] p-8 w-md md:w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            textColor='text-white'
          />
          <Button
            onClick={loading ? null : handleSubmit}
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Requesting OTP ...' : 'Request OTP'}
          </Button>
        </form>
        <div className='flex justify-center mt-6'>
          <TextButton onClick={() => navigate('/login')} variant="primary">Back to Login</TextButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
