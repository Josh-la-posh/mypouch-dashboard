import axios from './axios';
import { toast } from 'react-toastify';

class PasswordRecoveryService {
  async generateOtp(email) {
    try {
      const response = await axios.post('/admin/generate-otp', JSON.stringify({ email }));
      toast.success('OTP sent to your email');
      return response.data;
    } catch (err) {
      if (!err.response) {
        toast.error('No server response');
      } else {
        toast.error(err.response.data?.message || 'Failed to generate OTP');
      }
      throw err;
    }
  }

  async resetPassword(email, otp, newPassword) {
    try {
      const response = await axios.post('/admin/reset-password', JSON.stringify({ email, otp: Number(otp), newPassword }));
      toast.success('Password reset successful');
      return response.data;
    } catch (err) {
      if (!err.response) {
        toast.error('No server response');
      } else {
        toast.error(err.response.data?.message || 'Failed to reset password');
      }
      throw err;
    }
  }
}

export default PasswordRecoveryService;
